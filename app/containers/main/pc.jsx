'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import common from '../../components/common';
import Toast from '../../components/common/toast';
import Qqlogin from '../../components/user/login/qqlogin';
import Wxlogin from '../../components/user/login/wxlogin';
import BindCompany from '../../components/user/login/bdcompany';

import { history} from '../../';
import {
  sendlogcode,
  sendregcode,
  send_register
} from '../../actions/reg';
import {
  getemployeeinfo
} from '../../actions/company';

import {
	getcompanylist,
	show_bdcompany
} from '../../actions/bdcompany';

import {
	send_login,
	LOGIN
} from '../../actions/login';

class PCMain extends Component {
	constructor(props){
		super(props);
		this.state={
			method: "login",
		}
	}
	
	componentDidMount(){
		require('../../static/less/common.less');
		require('./less/pc.less');
		const {dispatch,uid,token} = this.props;
		$(function () { $("[data-toggle='tooltip']").tooltip(); });
		if(uid>0 && token!=""){
			getemployeeinfo(uid,token,dispatch,function(companyid){
				if(companyid != ""){
					history.push('/company/'+companyid);
				}
			});
		}
	}
  
	setNav(method){
		this.setState({method: method});
	}
  	
	/*绑定用户到企业*/
	handleLogin(){
		var phone_obj = this.refs.login_phone;
		var codes_obj = this.refs.login_codes;
		var phone = jQuery(phone_obj).val().replace(/ /g,'');
		if(phone.length==11){
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		    if(!myreg.test(phone)){
		    	new Toast({message:"手机格式错误"}).show();
				jQuery(this.refs.login_phone).css("border-color", "#a94442");
	            jQuery(phone_obj).val("");
	            jQuery(phone_obj).focus();
	            return;
		    }
		}else{
			new Toast({message:"手机格式错误"}).show();
			jQuery(this.refs.login_phone).css("border-color", "#a94442");
			return;
		}
		var codes = jQuery(codes_obj).val();
		if(codes.length != 4){
			new Toast({message:'验证码应为4位数字'}).show();
			jQuery(this.refs.login_codes).css("border-color", "#a94442");
			return;
		}
		$(this.refs.login_btn).button('loading');
		send_login(phone,codes,this.props.dispatch,(status,info,data)=> {
			$(this.refs.login_btn).button('reset');
			if(status == 200){
				let companyid = data.companyid;
				let is_manager = data.is_manager;
				let uid = data.uid;
				let token = data.token;
				if(typeof companyid != "undefined" && typeof uid != "undefined" && typeof token != "undefined" && typeof is_manager != "undefined"){
				  let bindcompany_flg = companyid != "0" ? true:false;
				  //发布用户登陆结果
				  this.props.dispatch({
					type: LOGIN,
					companyid: companyid,
					uid: uid,
					token: token,
					is_manager: is_manager
				  });

				  if(!bindcompany_flg){
					show_bdcompany(uid,token,this.props.dispatch);
				  }else{
					//跳转到企业论坛首页
					history.push("/company/"+companyid);
					return;
				  }
				}
				common.setItem("myphone", phone);
			}else if(status == 1005){
				jQuery(codes_obj).val("");
			}
			new Toast({message: info}).show();
		});
	}

	getCookie(c_name){
		if (document.cookie.length>0){
			var c_start=document.cookie.indexOf(c_name + "=")
			if (c_start!=-1){ 
				c_start=c_start + c_name.length+1 
				var c_end=document.cookie.indexOf(";",c_start)
				if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end))
			} 
		}
		return ""
	}
  	
	//发送登录短信
	sendmsg(){
		let phone_obj = this.refs[this.state.method+'_phone'];
		let phone = jQuery(phone_obj).val();
		if(this.checkphone(phone_obj)){
			/**
			if($("#code5").val() != this.getCookie("code") && $("#code6").val() != this.getCookie("code")){
				new Toast({message:"图形验证码错误"}).show();
				return false;
			}
			**/
			var send_btn_obj = this.refs[this.state.method+'_send_btn'];
			jQuery(send_btn_obj).addClass("disabled");
			jQuery(send_btn_obj).attr("disabled",true);
			if(this.state.method == "login"){
	      sendlogcode(phone.replace(/ /g,''), this.props.dispatch, function(status, info){
	        if(status == 200){
	        		$(this.refs.login_codes).val();
		          var waittime = 120;
		          var lefttime = waittime;
		          var setsendcontent = function(){
		            lefttime--;
		            jQuery(send_btn_obj).html(lefttime+"秒重发");
		          }
		          var intervalId = window.setInterval(setsendcontent, 1000);
		          window.setTimeout(function(){
		            jQuery(send_btn_obj).removeClass("disabled");
		            jQuery(send_btn_obj).attr("disabled",false);
		            window.clearInterval(intervalId);
		            jQuery(send_btn_obj).html("重新发送");
		          },waittime*1000);
		    	}else{
		    		if(status == 2009){
		    			$(phone_obj).val("");
		    		}
	          new Toast({message:info}).show();
	          jQuery(send_btn_obj).removeClass("disabled");
	          jQuery(send_btn_obj).attr("disabled",false);
	        }
	      }.bind(this));
      }else{
      sendregcode(0, "", phone.replace(/ /g,''), this.props.dispatch, function(status, info){
        if(status == 200){
          var waittime = 120;
          var lefttime = waittime;
          var setsendcontent = function(){
            lefttime--;
            jQuery(send_btn_obj).html(lefttime+"秒重发");
          }
          var intervalId = window.setInterval(setsendcontent, 1000);
          window.setTimeout(function(){
            jQuery(send_btn_obj).removeClass("disabled");
            jQuery(send_btn_obj).attr("disabled",false);
            window.clearInterval(intervalId);
            jQuery(send_btn_obj).html("重新发送");
          },waittime*1000);
        }else{
          new Toast({message:info}).show();
          jQuery(send_btn_obj).removeClass("disabled");
          jQuery(send_btn_obj).attr("disabled",false);
        }
      }.bind(this));
      }
		}else{
			new Toast({message:"手机号填写错误"}).show();
		}
	}
	
  	//验证手机号
	checkphone(phone_obj){
        var insertStr = function(str1,n,str2){
            if(str1.length<n){
                return str1;
            }else{
                var s1 = str1.substring(0,n);
                var s2 = str1.substring(n,str1.length);
                return s1+str2+s2;
            }
        }
		jQuery(phone_obj).val(insertStr(insertStr(jQuery(phone_obj).val().replace(/\D/g,'').replace(/ /g,''),3," "),8," "));
		var phone = jQuery(phone_obj).val().replace(/ /g,'');
		if(phone.length>11){
			jQuery(phone_obj).val(phone.substr(0,11));
		}
		if(phone.length==11){
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		    if(myreg.test(phone)){
		    	return true;
		    }
		}
		return false;
	}
	
  	//验证公司名称合法性
  	ckcompanyname(){
  		let that = this;
			var showerror = function(msg){
				new Toast({message:msg}).show();
				$(that.refs.register_srarch_btn).button('reset');
				return false;
			};
  		$(that.refs.register_srarch_btn).button('loading');
  		let companyname = jQuery(that.refs.register_companyname).val();
  		if(companyname.length < 4){
  			showerror("公司名称至少是4个汉字！");
  			return;
  		}else{
  			var isChineseChar = function(str){
			   var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
			   return reg.test(str);
				}
  			for(var i=0; i<companyname.length; i++){
				if (!isChineseChar(companyname[i])){
		  			showerror("公司名称至少是4个汉字！");
		  			return;
				}
  			}
  		}
			jQuery(that.refs.register_companyname).css("border-color", "#ccc");
			getcompanylist(companyname,this.props.dispatch, function (status, info, data) {
				if(status == 200){
					$(that.refs.register_srarch_btn).button('reset');
				}else{
		  			showerror(info);
		  			return;
				}
			});
  	}
  	
  	handleRegister(){
  		var companyid = jQuery(this.refs.companylist).val();
  		if(typeof companyid == "undefined" || companyid == 0){
  			new Toast({message:"请确认您就职的公司"}).show();
  			return;
  		}
			var phone_obj = this.refs.register_phone;
			var codes_obj = this.refs.register_codes;
			var phone = jQuery(phone_obj).val().replace(/ /g,'');
			if(phone.length==11){
				var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			    if(!myreg.test(phone)){
			    	new Toast({message:"手机格式错误"}).show();
					jQuery(phone_obj).css("border-color", "#a94442");
		            jQuery(phone_obj).val("");
		            jQuery(phone_obj).focus();
		            return;
			    }
			}else{
				new Toast({message:"手机格式错误"}).show();
				jQuery(phone_obj).css("border-color", "#a94442");
				return;
			}
			var codes = jQuery(codes_obj).val();
			if(codes.length != 4){
				new Toast({message:'验证码应为4位数字'}).show();
				jQuery(codes_obj).css("border-color", "#a94442");
				return;
			}
			$(this.refs.register_btn).button('loading');
			send_register(companyid, phone, codes, this.props.dispatch, function(status,info,data){
	      if(status == 200){
			let companyid = data.companyid;
			let is_manager = data.is_manager;
			let uid = data.uid;
			let token = data.token;
			if(typeof companyid != "undefined" && typeof uid != "undefined" && typeof token != "undefined" && typeof is_manager != "undefined"){
			  let bindcompany_flg = companyid != "0" ? true:false;
			  //发布用户登陆结果
			  this.props.dispatch({
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
			common.setItem("myphone", phone);
	      }else{
	        $(phone_obj).css("border-color", "#a94442");
	        new Toast({message:info}).show();
	      }
	      $(this.refs.register_btn).button('reset');
			}.bind(this));
  	}
  
  render() {
    return (
    !this.props.bindcompany_flg ?
				/*加载绑定企业的组件*/
		<BindCompany />
	:
      	<div className="animated bounceInUp login_box">
	      	<div className="tabs">
	      		<div onClick={this.setNav.bind(this,"login")} className={"tabs_select"+(this.state.method=="login"?" current":"")}>登录</div>
	      		·
	      		<div onClick={this.setNav.bind(this,"register")} className={"tabs_select"+(this.state.method=="register"?" current":"")}>注册</div>
	      	</div>
	{
		this.state.method == 'login' ?
			<form className="tabs_login animated fadeIn" role="form">
			  <div className="form-group">
			    <input type="phone" className="form-control input-lg" ref="login_phone" placeholder="请填写您的手机号" defaultValue={common.getItem("myphone")} />
			  </div>
			{/**
			  <div className="form-group">
				<div className="input-group">
					<input type="text" id="code5" className="form-control input-lg" placeholder="图片验证码" />
					<span className="input-group-btn">
						<img src="http://www.companyclub.cn/getcapture?v=123456" style={{height:"45px"}} />
					</span>
				</div>
			  </div>
			**/}
			  <div className="form-group">
                <div className="input-group">
                    <input type="text" className="form-control input-lg" ref="login_codes" placeholder="验证码" />
                    <span className="input-group-btn">
                        <button onClick={this.sendmsg.bind(this)} ref="login_send_btn" className="btn btn-default btn-lg" type="button">获取验证码</button>
                    </span>
                </div>
			  </div>
			  <button ref="login_btn" onClick={this.handleLogin.bind(this)} type="button" data-loading-text="登录中" className="btn btn-success btn-lg btn-block">登&nbsp;&nbsp;录</button>
			</form>
		: 
			<form className="tabs_register animated fadeIn" role="form">
			  <div className="form-group">
	        <div className="input-group">
	            <input type="text" className="form-control input-lg" ref="register_companyname" placeholder="我所在公司的名称" />
	            <span className="input-group-btn">
	                <a role="button" onClick={this.ckcompanyname.bind(this)} ref="register_srarch_btn" className="btn btn-default btn-lg" type="button" data-loading-text="正在检索" data-toggle="tooltip" data-placement="right" title="公司名称必须包含地址信息,如:北京众鸣世纪科技">检索</a>
	            </span>
	        </div>
			  </div>
{this.props.companyList.length>0 ? 
			  <div className="form-group">
					<select ref="companylist" className="form-control input-lg animated flash">
						<option value="0">请选择您就职的公司</option>
	        {this.props.companyList.map(function(company) {
	           return <option key={company.KeyNo} value={company.KeyNo}>{company.Name}</option>;
	        })}
			    </select>
			  </div>
:null}
			  <div className="form-group">
			    <input type="phone" className="form-control input-lg" ref="register_phone" placeholder="请填写您的手机号" />
			  </div>
			{/**
			  <div className="form-group">
				<div className="input-group">
					<input type="text" id="code6" className="form-control input-lg" placeholder="图片验证码" />
					<span className="input-group-btn">
						<img src="http://www.companyclub.cn/getcapture?v=123456" style={{height:"45px"}} />
					</span>
				</div>
			  </div>
			**/}
			  <div className="form-group">
				<div className="input-group">
					<input type="text" className="form-control input-lg" ref="register_codes" placeholder="验证码" />
					<span className="input-group-btn">
						<button onClick={this.sendmsg.bind(this)} ref="register_send_btn" className="btn btn-default btn-lg" type="button">获取验证码</button>
					</span>
				</div>
			  </div>
			  <button type="button" ref="register_btn" data-loading-text="正在注册" onClick={this.handleRegister.bind(this)} className="btn btn-primary btn-lg btn-block">注&nbsp;&nbsp;册</button>
			</form>
	}
	      	<div className="login_thirdparty">
	      		<h6>----------&nbsp;&nbsp;&nbsp;&nbsp;社交帐号直接注册&nbsp;&nbsp;&nbsp;&nbsp;----------</h6>
	      		<Qqlogin />
	      		<Wxlogin />
	      	</div>
      	</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
    bindcompany_flg: state.bdcompany.bindcompany_flg,
    companyList: state.bdcompany.companyList,
    selected_company: state.bdcompany.selected_company
  }
}

export default connect(mapStateToProps)(PCMain);
