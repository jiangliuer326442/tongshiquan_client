import {
  server_url,
  history
} from '../';
import common from '../components/common';
import Toast from '../components/common/toast';

import {show_bdcompany} from './bdcompany';

export const LOGIN = 'login';
export const AVATAR = 'avatar';
export const LOGOUT = 'logout';

//退出
export function logout(uid,token){
  common.ajax({
    url: server_url + "/logout.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{},
    success:function(status, info, data){
		common.removeItem("avatar");
		common.removeItem("companyid");
		common.removeItem("is_manager");
		common.removeItem("token");
		common.removeItem("ueditor_preference");
		common.removeItem("uid");
		history.push("/"); 
    }
  });
}

//绑定微信
export function wx_bind(){
  window.open ( server_url + "/wxbind.jsp",'qqwindow','height=500,width=700,top=100,left=200px,toolbar=no, menubar=no, scrollbars=no, resizable=no, loca tion=no, status=no');
}

//微信登陆
export function wx_login() {
  window.open ( server_url + "/wxlogin.jsp",'qqwindow','height=500,width=700,top=100,left=200px,toolbar=no, menubar=no, scrollbars=no, resizable=no, loca tion=no, status=no');
}

//绑定叮叮
export function dd_bind(){
  window.open ( server_url + "/ddbind.jsp",'qqwindow','height=500,width=700,top=100,left=200px,toolbar=no, menubar=no, scrollbars=no, resizable=no, loca tion=no, status=no');
}

//登陆叮叮
export function dd_login(){
  window.open ( server_url + "/ddlogin.jsp",'qqwindow','height=500,width=700,top=100,left=200px,toolbar=no, menubar=no, scrollbars=no, resizable=no, loca tion=no, status=no');
}

//绑定qq
export function qq_bind(){
  window.open ( server_url + "/qqbind.jsp",'qqwindow','height=500,width=700,top=100,left=200px,toolbar=no, menubar=no, scrollbars=no, resizable=no, loca tion=no, status=no');
}

//QQ登陆
export function qq_login() {
  window.open ( server_url + "/qqlogin.jsp",'qqwindow','height=500,width=700,top=100,left=200px,toolbar=no, menubar=no, scrollbars=no, resizable=no, loca tion=no, status=no');
}

//设置头像
export function setAvatar(avatar){
  return {
    type: AVATAR,
    avatar
  };
}

let jumpto = (companyid,uid,token,is_manager,dispatch) => {
	if(typeof companyid != "undefined" && typeof uid != "undefined" && typeof token != "undefined" && typeof is_manager != "undefined"){
	  let bindcompany_flg = companyid != "0" ? true:false;
	  //发布用户登陆结果
	  dispatch({
		type: LOGIN,
		companyid: companyid,
		uid: uid,
		token: token,
		is_manager: is_manager
	  });

	  if(!bindcompany_flg){
		show_bdcompany(uid,token,dispatch);
	  }else{
		//跳转到企业论坛首页
		history.push("/company/"+companyid);
		return;
	  }
	}
}

//发送登录信息
export function send_login(phone,codes,dispatch,cb){
  common.ajax({
    url: server_url + "/loginbyphone.jsp?",
    type:"POST",
    data:{phone: phone, codes: codes},
    success:function(status, info, data){
    	cb(status,info,data);
    }
  });
}

//接收openid
export function receive_openid(uid,token,dispatch){
	if(common.getItem("is_fresh") == 1){
		let qqopenid = common.getItem("qqopenid");
		if(typeof(qqopenid) != "undefined"){
		  common.ajax({
		    url: server_url + "/setqqopenid.jsp?uid=" + uid + "&token=" + token,
		    type:"POST",
		    data:{openid: qqopenid},
		    success:function(status, info, data){
		    	if(status == 200){
						window.location.reload();
		    	}else{
		    		new Toast({message: info}).show();
		    	}
		    }
		  });
			common.removeItem("qqopenid");
		}
		let wxopenid = common.getItem("wxopenid");
		let wxunionid = common.getItem("wxunionid");
		if(typeof(wxopenid) != "undefined" && typeof(wxunionid) != "undefined"){
		  common.ajax({
		    url: server_url + "/setwxopenid.jsp?uid=" + uid + "&token=" + token,
		    type:"POST",
		    data:{openid: wxopenid, unionid: wxunionid},
		    success:function(status, info, data){
		    	if(status == 200){
						window.location.reload();
		    	}else{
		    		new Toast({message: info}).show();
		    	}
		    }
		  });
			common.removeItem("wxopenid");
			common.removeItem("wxunionid");
		}
		let ddopenid = common.getItem("ddopenid");
		let ddunionid = common.getItem("ddunionid");
		if(typeof(ddopenid) != "undefined" && typeof(ddunionid) != "undefined"){
		  common.ajax({
		    url: server_url + "/setddopenid.jsp?uid=" + uid + "&token=" + token,
		    type:"POST",
		    data:{openid: ddopenid, unionid: ddunionid},
		    success:function(status, info, data){
		    	if(status == 200){
						window.location.reload();
		    	}else{
		    		new Toast({message: info}).show();
		    	}
		    }
		  });
			common.removeItem("ddopenid");
			common.removeItem("ddunionid");
		}
	}
	common.setItem("is_fresh",0);
}

//接收登陆消息
export function receive_login(dispatch){
  let companyid,uid,token,is_manager;
	if(common.getItem("is_fresh") == 1){
		companyid = common.getItem("companyid");
		is_manager = common.getItem("is_manager");
		uid = common.getItem("uid");
		token = common.getItem("token");
		if(typeof(uid) != "undefined"){
			jumpto(companyid,uid,token,is_manager,dispatch);
		}
	}
	common.setItem("is_fresh",0);
}
