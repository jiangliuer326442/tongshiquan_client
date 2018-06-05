import common from '../components/common';

import {
  server_url
} from '../';

import {
	addchat
} from './chat';

//发起会话
export function say(to,content,content_type,uid,token,dispatch){
	//新建消息体对象
	var obj = new RL_YTX.MsgBuilder();//设置自定义消息id
	obj.setText(content_type+"_"+content);
	//设置发送的消息类型 1:文本消息 4:图片消息 6:压缩文件 7:非压缩文件//发送非文本消息时，text字段将被忽略，发送文本消息时 file字段将被忽略
	obj.setType(1);//设置接收者
	obj.setReceiver(to);

	RL_YTX.sendMsg(obj, function(){
		//发送消息成功//处理用户逻辑，通知页面}, 
	}, function(obj){
		//失败//发送消息失败//处理用户逻辑，通知页面刷新，展现重发按钮}, 
	}, function(sended, total){
		//发送图片或附件时的进度条
		//如果发送文本消息，可以不传该参数
    });

	addchat(to,content,content_type,uid,token,dispatch);
}

//连接服务器
export function connect(uid,token,dispatch,cb){
  common.ajax({
	url: server_url + "/getchatcfg.jsp?uid=" + uid + "&token=" + token,
	type:"GET",
	success:function(status, info, data){
		if(status == 200){
			RL_YTX.init(data.appid);
			RL_YTX.setLogClose();
			var loginBuilder = new RL_YTX.LoginBuilder();
			loginBuilder.setType(1);//登录类型 1账号登录，2voip账号密码登录
			loginBuilder.setUserName(data.username);//设置用户名
			loginBuilder.setPwd();//type值为1时，密码可以不赋值
			loginBuilder.setSig(data.sig.toLowerCase());//设置sig
			loginBuilder.setTimestamp(data.timestamp);//设置时间戳
			//执行用户登录
			RL_YTX.login(loginBuilder, function(obj){
				//登录成功回调
				cb();
			})
		}
	}
  });
}

