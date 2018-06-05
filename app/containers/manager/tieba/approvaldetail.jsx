'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../../components/manager/header';

import {handletiebaapprov} from '../../../actions/tieba';
import {
  setsmallkindid
} from '../../../actions/manager';

class Settings extends Component {
  constructor(props){
			super(props);
			this.state = {
				title: props.appv.title,
				desc: props.appv.desc,
				logo: props.appv.logo,
				user: props.appv.user,
			};
  }
	handleSubmit(){
		 const {uid,token,dispatch} = this.props;
		 jQuery(".alert-success").hide();
		 jQuery(".alert-danger").hide();
		 let title = jQuery(this.refs.title).val();
		 if(jQuery.trim(title) == ''){
			 this.showerror('title','贴吧名称不能为空');
			 return;
		 }
		 if(title.length<2 || title.length>20){
			 this.showerror('title','贴吧名称不合规范');
			 return;
		 }
		 let desc = jQuery(this.refs.desc).val();
		 if(jQuery.trim(desc) == ''){
			 this.showerror('desc','贴吧描述内容不能为空');
			 return;
		 }
		 if(desc.length<10 || title.length>50){
			 this.showerror('desc','贴吧描述文字不合规范');
			 return;
		 }
		 let allow_status = jQuery('input[name="allow_status"]:checked ').val();
		 if(allow_status!=2 && allow_status!=3){
			 this.showerror('allow_status','请选择是否允许创建贴吧');
			 return;
		 }
		 handletiebaapprov(this.props.appv.id, title, this.refs.logo.files.length > 0 ? this.refs.logo.files[0]:this.state.logo, desc, allow_status, uid, token, dispatch, function(status){
			 dispatch(setsmallkindid(1));
		 }.bind(this));
	}
	 showerror(ref, msg){
		 jQuery(".alert-danger").show();
		 jQuery(".alert-danger").text(msg);
		 jQuery(this.refs[ref+"_msg"]).html("<font color='red'>"+msg+"</font>");
		 jQuery(this.refs[ref]).css("border-color","red");
	 }
 render(){
   return (
   <div style={{height: "100%", backgroundColor:"#fff"}}>
    <div style={{display:"flex",flexDirection:"column",height: "100%",padding:"22px 27px",border:"1px solid #ccc",width:"800px",borderRightWidth:"0px"}}>
      <Header title="贴吧审核" />
      <div className="admin_form">
        <div className="alert alert-success" style={{display:"none"}}>
        </div>
        <div className="alert alert-danger" style={{display:"none"}}>
        </div>
        <label>贴吧名称 <i ref="title_msg"></i></label>
        <div className="row">
          <div className="input_area">
            <input type="text" ref="title" placeholder="贴吧名称" value={this.state.title} onChange={(e)=>this.setStatus({title:e.target.value})} />
          </div>
        </div>
        <label>贴吧图标 <i ref="logo_msg"><img src={this.state.logo} width="50" height="50" /></i></label>
        <div className="row">
          <div className="input_area">
            <input type="file" ref="logo" />
          </div>
        </div>
        <label>贴吧描述 <i ref="desc_msg"></i></label>
        <div className="row">
          <div className="input_area">
            <textarea ref="desc" placeholder="简单介绍一下创建贴吧的打算把～">{this.state.desc}</textarea>
          </div>
        </div>
        <label>申请人 </label>
        <div className="row">
          <div className="input_area">
          	<input type="text" value={this.state.user} readonly="readonly" />
          </div>
        </div>
        <label>是否允许创建贴吧 <i ref="allow_status_msg"></i></label>
        <div className="row">
						 <div className="input_area">
							 <input type="radio" name="allow_status" value="2" defaultChecked="checked" />同意
							 <input type="radio" name="allow_status" value="3" />不同意
						 </div>
        </div>
        <div style={{display: "flex", flexFlow:"row nowrap", justifyContent:"center"}}>
          <button ref="btn" onClick={this.handleSubmit.bind(this)} type="button" className="btn btn-info" style={{width:"80px"}} data-loading-text="正在处理">确认</button>
        </div>
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
    appv: state.tieba.appv
  }
}

export default connect(mapStateToProps)(Settings);
