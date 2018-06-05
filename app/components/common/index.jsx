import Toast from './toast.jsx';
exports.Toast = Toast;

import ajax from './ajax.jsx';
exports.ajax = ajax;

import img from './img.jsx';
exports.img = img;

exports.getkey = function(){
  var key = localStorage.getItem("_k");
  if(key == null){
  　　	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  　　	var maxPos = $chars.length;
  　　	var key = '';
  　　	for (let i = 0; i < 16; i++) {
  　　　　	key += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　	}
    localStorage.setItem("_k", key);
  }
  return key;
}

/* 2007-11-28 XuJian */
//截取字符串 包含中文处理
//(串,长度,增加...)
exports.trim = function(str, len, hasDot){
		var newStr = "";
		if (typeof str != 'undefined'){
			var newLength = 0;
			var chineseRegex = /[^\x00-\xff]/g;
			var singleChar = "";
			var strLength = str.replace(chineseRegex,"**").length;
			for(var i = 0;i < strLength;i++)
			{
					singleChar = str.charAt(i).toString();
					if(singleChar.match(chineseRegex) != null)
					{
							newLength += 2;
					}
					else
					{
							newLength++;
					}
					if(newLength > len)
					{
							break;
					}
					newStr += singleChar;
			}
			if(hasDot && strLength > len)
			{
					newStr += "...";
			}
		}
		return newStr;
}

exports.setItem = function(key, value){
	localStorage.setItem(key,value);
}

exports.getItem = function(key){
	let value = localStorage.getItem(key);
	if(value == null) value="";
	return value;
}

exports.removeItem = function(key){
	localStorage.removeItem(key);
}
