'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../../components/manager/header';
require('../../../components/common/confirm');

import {
	gettiebacfg,
	settieba
} from '../../../actions/tieba';
import {
  getemployeelist
} from '../../../actions/employee';

class Settings extends Component {

 componentDidMount(){
	 const {refid,uid,token,dispatch} = this.props;
   if(this.props.employee_list.length == 0){
     getemployeelist(uid, token, dispatch);
   }
   gettiebacfg(refid,uid,token,dispatch);
 }
 handleSubmit(){
   jQuery(".alert-success").hide();
   jQuery(".alert-danger").hide();
   let model_name = jQuery(this.refs.name).val();
   if(jQuery.trim(model_name) == ''){
     this.showerror('name','模块名称不能为空');
     return;
   }
   if(model_name.length<4 || model_name.length>20){
     this.showerror('name','模块名称不合规范');
     return;
   }
   let model_sort;
   if(this.props.is_manager=="1"){
	   model_sort = jQuery(this.refs.sort).val();
	   if(jQuery.trim(model_sort) == ''){
	     this.showerror('sort','模块排序不能为空');
	     return;
	   }
   }else{
   		model_sort = this.props.sort.toString();
   }
   let model_leader;
   if(this.props.is_manager=="1"){
   		model_leader = $(this.refs.leaderid).val();
   	}else{
   		model_leader = this.props.leaderid.toString();
   	}
   $(this.refs.btn).button('loading');

   let cb = () => {
     jQuery(".alert-success").show();
     jQuery(".alert-success").text("操作成功");
     $(this.refs.btn).button('reset');
   }

		settieba( this.props.refid, model_name, this.refs.logo.files.length > 0 ? this.refs.logo.files[0]:this.props.logo, jQuery(this.refs.desc).val(), jQuery('input[name="can_post_flg"]:checked ').val(), jQuery('input[name="is_allow_comment"]:checked ').val(), jQuery('input[name="is_hide_comment"]:checked ').val(), model_sort, model_leader, this.props.uid, this.props.token, this.props.dispatch, () => {
			cb();
		});
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
    {
			this.props.name != "" ?
    <div style={{display:"flex",flexDirection:"column",height: "100%",padding:"22px 27px",border:"1px solid #ccc",width:"800px",borderRightWidth:"0px"}}>
      <Header title="贴吧设置" />
      <div className="help_center">
      	<p>
      		注意事项:
      	</p>
      	<p>
      		1.修改是否允许评论以及是否显示评论并不会影响已经发布的帖子,如果想要变更已经发布的帖子,需要到帖子的详细页面进行变更
      	</p>
      </div>
      <div className="admin_form">
        <div className="alert alert-success" style={{display:"none"}}>
        </div>
        <div className="alert alert-danger" style={{display:"none"}}>
        </div>
        <label>贴吧名称 <i ref="name_msg"></i></label>
        <div className="row">
          <div className="input_area">
            <input type="text" ref="name" placeholder="贴吧名称" width="250" defaultValue={this.props.name} />
          </div>
          <p>4~10 个汉字</p>
        </div>
        <label>贴吧LOGO <i ref="logo_msg"><img src={this.props.logo} width="50" height="50" /></i></label>
        <div className="row">
          <div className="input_area">
            <input type="file" ref="logo" width="50" height="50" />
          </div>
          <p>贴吧图标，40*40 像素，可不上传</p>
        </div>
        <label>贴吧描述 <i ref="desc_msg"></i></label>
        <div className="row">
          <div className="input_area">
            <textarea ref="desc" placeholder="简单介绍一下创建贴吧的打算把～">{this.props.descs}</textarea>
          </div>
        </div>

        <label>是否允许其他人员发帖</label>
        <div className="row">
        {this.props.can_post_flg === true || this.props.can_post_flg=="1" ?
                   <div className="input_area">
                     <input type="radio" name="can_post_flg" value="1" defaultChecked="checked" />是
                     <input type="radio" name="can_post_flg" value="0" />否
                   </div>
        :
                   <div className="input_area">
                     <input type="radio" name="can_post_flg" value="1" />是
                     <input type="radio" name="can_post_flg" value="0" defaultChecked="checked" />否
                   </div>
        }
          <p>除吧主以外,是否允许其他员工发帖</p>
        </div>
        
        <label>是否允许评论</label>
        <div className="row">
        {this.props.is_allow_comment === true || this.props.is_allow_comment=="1" ?
                   <div className="input_area">
                     <input type="radio" name="is_allow_comment" value="1" onChange={()=>{}} defaultChecked="checked" />是
                     <input type="radio" name="is_allow_comment" value="0" onChange={()=>{}} />否
                   </div>
        :
                   <div className="input_area">
                     <input type="radio" name="is_allow_comment" value="1" onChange={()=>{}} />是
                     <input type="radio" name="is_allow_comment" value="0" onChange={()=>{}} defaultChecked="checked" />否
                   </div>
        }
          <p>否允许员工评论您在该模块发表的帖子</p>
        </div>

        <label>是否匿名评论</label>
        <div className="row">
        {this.props.is_hide_comment === true || this.props.is_hide_comment=="1" ?
                   <div className="input_area">
                     <input type="radio" name="is_hide_comment" value="1" defaultChecked="checked" />是
                     <input type="radio" name="is_hide_comment" value="0" />否
                   </div>
        :
                   <div className="input_area">
                     <input type="radio" name="is_hide_comment" value="1" />是
                     <input type="radio" name="is_hide_comment" value="0" defaultChecked="checked" />否
                   </div>
        }
          <p>员工评论的内容是否对其他员工可见</p>
        </div>
{this.props.is_manager=="1" ?
	<div>
        <label>模块管理员</label>
        <div className="row">
          <div className="input_area">
            <select ref="leaderid" style={{width:"180px"}} defaultValue={this.props.leaderid}>
            {
              this.props.employee_list.map((item, index) => {
                return <option key={index} value={item.userid}>{item.user_name+" ("+item.user_nick+")"}</option>
              })
            }
            </select>
          </div>
          <p></p>
        </div>
	</div>
	:null
}
{this.props.is_manager=="1" ?
	<div>
         <label>模块排序</label>
        <div className="row">
          <div className="input_area">
            <input type="number" ref="sort" placeholder="模块排序" width="10" maxLength="3" defaultValue={this.props.sort} />
          </div>
          <p>模块在论坛首页的摆放位置，数字越小越靠前</p>
        </div>
	</div>
	:null
}
        <div style={{display: "flex", flexFlow:"row nowrap", justifyContent:"center"}}>
          <button ref="btn" onClick={this.handleSubmit.bind(this)} type="button" className="btn btn-info" style={{width:"80px"}} data-loading-text="正在保存">保存</button>
        </div>
      </div>
    </div>
    : null}
   </div>
   );
 }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
    employee_list: state.employee.list,
    is_manager: state.company.is_admin,
    can_post_flg: state.tieba.can_post_flg,
    is_allow_comment: state.tieba.is_allow_comment,
    is_hide_comment: state.tieba.is_hide_comment,
    leaderid: state.tieba.leaderid,
    logo: state.tieba.logo,
    name: state.tieba.name,
    sort: state.tieba.sort,
	descs: state.tieba.descs,
    current_refid: state.managernav.current_refid,
  }
}

export default connect(mapStateToProps)(Settings);
