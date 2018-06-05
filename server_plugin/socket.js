/**
 * 服务器端的socket插件
 × 用于聊天消息推送
 */

	let request = require('request');
	let CryptoJS = require('crypto-js');
	//用户列表，socket列表
	let users = [],sockets = [];
	let form_key = null;
 
	//加密
	function encrypt(word){
		 var key = CryptoJS.enc.Utf8.parse(form_key);
		 var iv  = CryptoJS.enc.Utf8.parse(form_key);
		 var srcs = CryptoJS.enc.Utf8.parse(word);
		 var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC});
	    return encrypted.toString();
	}
	
	//获取加密串
	function getkey(){
		if(form_key == null){
	　　	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	　　	var maxPos = $chars.length;
	　　	var str = '';
	　　	for (let i = 0; i < 16; i++) {
	　　　　	str += $chars.charAt(Math.floor(Math.random() * maxPos));
	　　	}
				form_key = str;
		}
		return form_key;
	}
 
	//ajax函数
	function ajax(url,data,cb){
		//获取加密串
		let key = getkey();
		//数据加密
		for(var name in data){
				if(typeof data[name] == "string"){
					data[name] = encrypt(encodeURI(encodeURI(data[name])));
				}
		}
		var options = {
						url: url+"&k="+key,
						method: 'POST',
						json:true,
						body: data
		};
		request(options, function(err,response,data){
			cb(err,response,data);
		});
	};
 
module.exports = function(server, server_url){
	//socket通信
		let io = require('socket.io').listen(server); 

	//接收到socket连接
	io.sockets.on('connection', function(socket) {
			//接收到登陆请求
			socket.on('login', function(uid,token) {
				//查询用户信息/验证登陆
				ajax('http://'+server_url+"/getbytoken.jsp?uid="+uid+"&token="+token, {}, function(err,response,data){
					if(err){
						socket.emit('loginFail',err);
					}else{
						if(data.status != 200){
							//发送登陆失败事件
							socket.emit('loginFail',data.status,data.info);
						}else{
							let userinfo = data.data;
							socket.uid = uid;
							socket.info = userinfo;
							users[uid] = data.nickname;
							sockets[uid] = socket;
							socket.emit('loginSuccess', userinfo);
							//io.sockets.emit('system', username, users.length, 'login');
						}
					}
				});
			});
			//user leaves
			socket.on('disconnect', function() {
					if (socket.uid != null) {
							users.splice(socket.uid, 1);
							sockets.splice(socket.uid, 1);
							socket.broadcast.emit('system', socket.info.nickname, users.length, 'logout');
					}
			});
			//new message get
			socket.on('postMsg', function(to, from, content, content_type) {
				if(typeof(sockets[to]) != "undefined"){
					sockets[to].emit('newMsg', content, from, content_type);
				}
			});
	});
}
