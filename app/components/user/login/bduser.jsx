import React,{Component} from 'react';
import { connect } from 'react-redux';
require('./less/bduser.less');
import { history} from '../../../';
import {
	company_getmyphone
} from '../../../actions/user';
import common from '../../common';
import {
  sendregcode,
  company_bind
} from '../../../actions/reg';
import {
	LOGIN
} from '../../../actions/login';
import {
	show_bdcompany
} from '../../../actions/bdcompany';

/**
 * 绑定用户
 × 2016.12.10
 × ruby <fanghailiang2016@gmail.com>
 */
class Bduser extends Component {
  constructor(props) {
      super(props);
      this.state = {
          phone: ""
      };
  }
  	/**
  	 * 判断注册后的用户将在企业扮演的角色
  	 */
  	componentDidMount(){
			const {uid,token,dispatch} = this.props;
			$(this.refs.phone).focus();
			company_getmyphone(uid,token,dispatch,function(phone){
        this.setState({phone: phone});
			}.bind(this));
  	}
	//发送短信
	sendmsg(){
		let phone_obj = this.refs.phone;
		if(this.checkphone()){
			var phone = jQuery(phone_obj).val();
			var send_btn_obj = this.refs.send_btn;
			jQuery(send_btn_obj).addClass("disabled");
			jQuery(send_btn_obj).attr("disabled",true);
      sendregcode(this.props.uid, this.props.token, phone.replace(/ /g,''), this.props.dispatch, function(status, info){
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
          this.props.onerror(info);
          jQuery(send_btn_obj).removeClass("disabled");
          jQuery(send_btn_obj).attr("disabled",false);
        }
      }.bind(this));
		}else{
            this.props.onerror("手机号错误");
			jQuery(this.refs.phone).css("border-color", "#a94442");
            jQuery(phone_obj).val("");
            jQuery(phone_obj).focus();
		}
	}
  	//验证手机号
	checkphone(){
        var insertStr = function(str1,n,str2){
            if(str1.length<n){
                return str1;
            }else{
                var s1 = str1.substring(0,n);
                var s2 = str1.substring(n,str1.length);
                return s1+str2+s2;
            }
        }
		var phone_obj = this.refs.phone;
		jQuery(phone_obj).val(insertStr(insertStr(jQuery(phone_obj).val().replace(/\D/g,'').replace(/ /g,''),3," "),8," "));
		var phone = jQuery(phone_obj).val().replace(/ /g,'');
		if(phone.length>11){
			jQuery(phone_obj).val(phone.substr(0,11));
		}
		if(phone.length==11){
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		    if(!myreg.test(phone)){
		    	this.props.onerror("手机号码不合规范");
				jQuery(this.refs.phone).css("border-color", "#a94442");
	            jQuery(phone_obj).val("");
	            jQuery(phone_obj).focus();
		    }else{
		    	return true;
		    }
		}
		return false;
	}
	/*绑定用户到企业*/
	handleNext(){
		var phone_obj = this.refs.phone;
		var codes_obj = this.refs.codes;
		var phone = jQuery(phone_obj).val().replace(/ /g,'');
		if(phone.length==11){
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		    if(!myreg.test(phone)){
		    	this.props.onerror("手机格式错误");
				jQuery(this.refs.phone).css("border-color", "#a94442");
	            jQuery(phone_obj).val("");
	            jQuery(phone_obj).focus();
	            return;
		    }
		}else{
			this.props.onerror("手机格式错误");
			jQuery(this.refs.phone).css("border-color", "#a94442");
			return;
		}
		var codes = jQuery(codes_obj).val();
		if(codes.length != 4){
			this.props.onerror('验证码应为4位数字');
			jQuery(this.refs.codes).css("border-color", "#a94442");
			return;
		}
		if(this.props.companyid == ""){
			this.props.onerror('系统错误');
			return;
		}
		$(this.refs.btn).button('loading');
    company_bind(this.props.uid, this.props.token, this.props.companyid, phone, codes, this.props.dispatch, function(status, info, data){
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
						show_bdcompany(this.props.uid, this.props.token,this.props.dispatch);
					}else{
						//跳转到企业论坛首页
						history.push("/company/"+companyid);
						return;
					}
				}
				common.setItem("myphone", phone);
      }else{
        jQuery(this.refs.phone).css("border-color", "#a94442");
        this.props.onerror(info);
      }
      $(this.refs.btn).button('reset');
    }.bind(this));
	}
	render(){
		return (
			<div className="bduser">
				<label className="phone_label">用我的手机号注册:</label>
				<input type="phone" className="phone input-lg" ref="phone" onKeyUp={this.checkphone.bind(this)} placeholder="手机号码 11位" value={this.state.phone} onChange={e=>this.setState({phone: e.target.value})} />
				<div className="codes_box">
					<label>验证码:</label>
					<input type="text" ref="codes" />
					<button type="button" ref="send_btn" className="btn btn-info" data-loading-text="正在发送" onClick={this.sendmsg.bind(this)}>发送验证码</button>
				</div>
				<div className="checkbox_box">
					<input type="checkbox" ref="agreement" value="1" defaultChecked="checked" /> 我同意&lt;&lt;同事圈注册协议&gt;&gt;
				</div>
				<button type="button" ref="btn" className="btn btn-info" onClick={this.handleNext.bind(this)} data-loading-text="正在验证">确认注册</button>
			</div>
		);
	}
}
function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
		companyid: state.bdcompany.selected_company
  }
}

export default connect(mapStateToProps)(Bduser);
