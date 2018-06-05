'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import common from '../../../components/common';

import Header from '../../../components/manager/header';

import {
  addemployee,
	editemployee
} from '../../../actions/employee';
import {
  setsmallkindid
} from '../../../actions/manager';

class Addemployee extends Component {
  constructor(props){
    super(props);
    if(props.method == "edit"){
      let currentuser = null;
      for(let i=0; i<props.employee_list.length; i++){
        if(props.employee_list[i].id == props.current){
          currentuser = props.employee_list[i];
          break;
        }
      }
      this.state = {
        uname: currentuser.user_name,
        unick: currentuser.user_nick,
        avatar: currentuser.user_avatar,
        mail: currentuser.user_mail,
        structerid: currentuser.structerid
      };
    }else{
      this.state = {
        uname: "",
        unick: "",
        avatar: "",
        mail: "",
        structerid: 0
      };
    }
  }

  handleSubmit(){
		let user_name = jQuery(this.refs.name).val();
		if(user_name == ''){
			this.showerror('name','姓名必填');
			return;
		}
		let user_nick = jQuery(this.refs.nick).val();
		if(user_nick == ''){
			user_nick = user_name;
		}
		let phone = null;
    if(this.props.method == "create"){
  		phone = jQuery(this.refs.phone).val().replace(/ /g,'');
  		if(phone == ''){
  			this.showerror('phone','手机号必填');
  			return;
  		}
  		let phone_obj = this.refs.phone;
  		if(phone.length==11){
  			let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  		    if(!myreg.test(phone)){
  				this.showerror('phone','手机格式错误');
  				jQuery(phone_obj).css("border-color", "#a94442");
  	            jQuery(phone_obj).val("");
  	            jQuery(phone_obj).focus();
  	            return;
  		    }
  		}else{
  			this.showerror('phone','手机格式错误');
  			jQuery(phone_obj).css("border-color", "#a94442");
  			return;
  		}
    }
		let user_mail = jQuery(this.refs.email).val();
		if(user_mail != ''){
			let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; //验证邮箱的正则表达式判断
			if(!reg.test(user_mail)){
				this.showerror('email','邮箱格式不对');
				return;
			}
		}
    if(this.props.method == "create"){
      if(this.refs.avatar.files.length == 0){
        this.showerror('avatar','请上传头像');
  			return;
      }
    }
		jQuery(this.refs.btn).button('loading');
    if(this.props.method == "create"){
      addemployee(this.refs.avatar.files[0],this.props.selected, phone, user_name, user_nick, user_mail, this.props.uid, this.props.token, this.props.dispatch, function(status){
        jQuery(this.refs.btn).button('reset');
        if(status == 200){
          this.props.dispatch(setsmallkindid(0))
        }else{
          new common.Toast({context:$('body'),message:"添加员工失败，开放注册的企业不允许添加员工",time:3000}).show();
        }
      }.bind(this));
    }else{
      editemployee(this.props.current, this.refs.avatar.files.length > 0 ? this.refs.avatar.files[0]:this.state.avatar,user_name,user_nick,user_mail, this.props.uid, this.props.token, this.props.dispatch, function(status,avatar){
        jQuery(this.refs.btn).button('reset');
        if(status == 200){
          this.setState({avatar: avatar});
					this.props.dispatch(setsmallkindid(0));
        }else{
          new common.Toast({context:$('body'),message:"修改员工信息出错",time:3000}).show();
        }
			}.bind(this));
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
        this.showerror('phone','手机号码不合规范');
        jQuery(this.refs.phone).css("border-color", "#a94442");
              jQuery(phone_obj).val("");
              jQuery(phone_obj).focus();
        }else{
          return true;
        }
    }
    return false;
  }

  showerror(ref, msg){
    jQuery(this.refs[ref+"_msg"]).html("<font color='red'>"+msg+"</font>");
    jQuery(this.refs[ref]).css("border-color","red");
  }

  render(){
    return (
    <div style={{height: "100%", backgroundColor:"#fff"}}>
      <div style={{display:"flex",flexDirection:"column",height: "100%",padding:"22px 27px",border:"1px solid #ccc",width:"800px",borderRightWidth:"0px"}}>
        <Header title={this.props.method=="create"?"添加员工":"修改信息"} return_flg="1" />
        <div className="admin_form">
          <label>姓名	<i ref="name_msg"></i></label>
          <div className="row">
            <div className="input_area">
              <input type="text" ref="name" placeholder="请填写姓名" width="250" defaultValue={this.state.uname} />
            </div>
            <p></p>
          </div>
          <label>昵称</label>
          <div className="row">
            <div className="input_area">
              <input type="text" ref="nick" placeholder="请填写昵称" width="250" defaultValue={this.state.unick} />
            </div>
            <p>如果大家习惯彼此用昵称称呼，那就填写一下吧</p>
          </div>
{this.props.method == "create" ?
          <div>
            <label>手机号 <i ref="phone_msg"></i></label>
            <div className="row">
              <div className="input_area">
                <input type="phone" ref="phone" onKeyUp={this.checkphone.bind(this)} placeholder="请填写手机号" width="250" />
              </div>
              <p></p>
            </div>
          </div>
 : null}
          <label>头像	<i ref="avatar_msg"></i></label>
          <div className="row">
            <div className="input_area">
{this.props.method == "create" ?
              <input type="file" ref="avatar" />
 :
              <div style={{marginLeft:"112px"}}>
                <img src={this.state.avatar} onClick={()=>$(this.refs.avatar).click()} width="100" height="100" style={{cursor: "pointer"}} />
                <input type="file" ref="avatar" style={{display:"none"}} />
              </div>
}
            </div>
            <p>点击图片上传头像,建议上传靓照,秀出自我!</p>
          </div>
          <label>邮箱 <i ref="email_msg"></i></label>
          <div className="row">
            <div className="input_area">
              <input type="email" ref="email" placeholder="请填写邮箱" width="250" defaultValue={this.state.mail} />
            </div>
            <p>建议您填写企业邮箱,重要事情将使用邮件通知</p>
          </div>
          <label>所属部门	<i ref="department_msg"> {this.props.selected_name}</i></label>
          <button ref="btn" onClick={this.handleSubmit.bind(this)} type="button" className="btn btn-info" style={{width:"80px", alignSelf:"center"}} data-loading-text="正在保存">保存</button>
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
    struct_arr: state.department.struct_arr,
    employee_list: state.employee.list,
  	selected: state.department.selected_department,
  	selected_name: state.department.selected_departmentname,
  }
}

export default connect(mapStateToProps)(Addemployee);
