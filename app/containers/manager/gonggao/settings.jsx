'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../../components/manager/header';
require('../../../components/common/confirm');

import {
  getgonggaocfg,
  setgonggao,
  addgonggao,
  initgonggao,
  delgonggao
} from '../../../actions/gonggao';
import {
  getemployeelist
} from '../../../actions/employee';

class Settings extends Component {
  constructor(props){
      super(props);
      this.state = {
				name: props.name,
				leaderid: props.leaderid,
				sort: props.sort
			};
  }

	componentWillReceiveProps(nextProps){
		const {refid,uid,token,dispatch} = nextProps;
   if(typeof(refid) != "undefined"){
     getgonggaocfg(refid,uid,token,dispatch);
   }
		this.setState({
			name: nextProps.name,
			leaderid: nextProps.leaderid,
			sort: nextProps.sort
		});
	}

 componentDidMount(){
	 const {refid,uid,token,dispatch} = this.props;
   if(this.props.employee_list.length == 0){
     getemployeelist(uid, token, dispatch);
   }
   if(typeof(refid) != "undefined"){
     getgonggaocfg(refid,uid,token,dispatch);
   }else{
     dispatch(initgonggao());
   }
 }
 handleDelete(){
   Ewin.confirm({ message: "确认要删除选择的数据吗？" }).on(e => {
     if (!e) {
      return;
     }
     const {refid,uid,token,dispatch} = this.props;
     delgonggao(refid,uid,token,dispatch);
     jQuery(".alert-success").show();
     jQuery(".alert-success").text("删除成功");
   });
 }
 handleSubmit(){
   jQuery(".alert-success").hide();
   jQuery(".alert-danger").hide();
   let model_name = jQuery(this.refs.name).val();
   if(jQuery.trim(model_name) == ''){
     this.showerror('name','模块名称不能为空');
     return;
   }
   if(model_name.length<4 || model_name.length>10){
     this.showerror('name','模块名称不合规范');
     return;
   }
   let model_sort = jQuery(this.refs.sort).val();
   if(jQuery.trim(model_sort) == ''){
     this.showerror('sort','模块排序不能为空');
     return;
   }
   $(this.refs.btn).button('loading');

   let cb = () => {
     jQuery(".alert-success").show();
     jQuery(".alert-success").text("操作成功");
     $(this.refs.btn).button('reset');
   }

  if(typeof(this.props.refid) != "undefined"){
    setgonggao( this.props.refid, model_name, this.refs.logo.files.length > 0 ? this.refs.logo.files[0]:this.props.logo, jQuery('input[name="is_allow_comment"]:checked ').val(), jQuery('input[name="is_hide_comment"]:checked ').val(), model_sort, jQuery(this.refs.leaderid).val(), this.props.uid, this.props.token, this.props.dispatch, () => {
      cb();
    });
  }else{
    addgonggao( model_name, this.refs.logo.files.length > 0 ? this.refs.logo.files[0]:this.props.logo, jQuery('input[name="is_allow_comment"]:checked ').val(), jQuery('input[name="is_hide_comment"]:checked ').val(), model_sort, jQuery(this.refs.leaderid).val(), this.props.uid, this.props.token, this.props.dispatch, () => {
      cb();
    });
  }
 }
 showerror(ref, msg){
   jQuery(".alert-danger").show();
   jQuery(".alert-danger").text(msg);
   jQuery(this.refs[ref+"_msg"]).html("<font color='red'>"+msg+"</font>");
   jQuery(this.refs[ref]).css("border-color","red");
 }
 render(){
   return (
   <div className="animated bounceInDown" style={{height: "100%", backgroundColor:"#fff"}}>
    {typeof(this.props.refid) == "undefined" || this.props.name != "" ?
    <div style={{display:"flex",flexDirection:"column",height: "100%",padding:"22px 27px",border:"1px solid #ccc",width:"800px",borderRightWidth:"0px"}}>
      <Header title={typeof(this.props.refid) == "undefined" ? "添加模块" : "模块设置"} />
      <div className="help_center">
      	<p>
      		注意事项:
      	</p>
      	<p>
      		1.修改模块管理员后,对应模块的管理员需要重新登陆后才能看到自己新获得的权限
      	</p>
      </div>
      <div className="admin_form">
        <div className="alert alert-success" style={{display:"none"}}>
        </div>
        <div className="alert alert-danger" style={{display:"none"}}>
        </div>
        <label>模块名称 <i ref="name_msg"></i></label>
        <div className="row">
          <div className="input_area">
            <input type="text" ref="name" placeholder="模块名称" width="250" value={this.state.name} onChange={(e)=>this.setStatus({name:e.target.value})} />
          </div>
          <p>4~10 个汉字</p>
        </div>
        <label>模块图标 <i ref="logo_msg"><img src={this.props.logo} width="50" height="50" /></i></label>
        <div className="row">
          <div className="input_area">
            <input type="file" ref="logo" />
          </div>
          <p>模块图标，40*40 像素，可不上传</p>
        </div>

        <label>是否允许评论</label>
        <div className="row">
        {this.props.is_allow_comment === true || this.props.is_allow_comment=="1" ?
                   <div className="input_area">
                     <input type="radio" name="is_allow_comment" value="1" defaultChecked="checked" />是
                     <input type="radio" name="is_allow_comment" value="0" />否
                   </div>
        :
                   <div className="input_area">
                     <input type="radio" name="is_allow_comment" value="1" />是
                     <input type="radio" name="is_allow_comment" value="0" defaultChecked="checked" />否
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

        <label>模块管理员</label>
        <div className="row">
          <div className="input_area">
            <select ref="leaderid" style={{width:"180px"}} value={this.state.leaderid} onChange={(e)=>this.setState({leaderid:e.target.value})}>
            {
              this.props.employee_list.map((item, index) => {
                return <option key={index} value={item.userid}>{item.user_name+" ("+item.user_nick+")"}</option>
              })
            }
            </select>
          </div>
          <p></p>
        </div>

         <label>模块排序</label>
        <div className="row">
          <div className="input_area">
            <input type="number" ref="sort" placeholder="模块排序" width="10" maxLength="3" value={this.state.sort} onChange={(e)=>this.setState({sort:e.target.value})} />
          </div>
          <p>模块在论坛首页的摆放位置，数字越小越靠前</p>
        </div>
        <div style={{display: "flex", flexFlow:"row nowrap", justifyContent:"center"}}>
          <button ref="btn" onClick={this.handleSubmit.bind(this)} type="button" className="btn btn-info" style={{width:"80px"}} data-loading-text={typeof(this.props.refid) == "undefined" ? "正在添加" : "正在保存"}>{typeof(this.props.refid) == "undefined" ? "添加" : "保存"}</button>
          {typeof(this.props.refid) != "undefined" ?
          <button ref="del" onClick={this.handleDelete.bind(this)} type="button" className="btn btn-danger" style={{width:"80px",marginLeft:"2em"}}>删除</button>
           : null}
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
    is_allow_comment: state.gonggao.is_allow_comment,
    is_hide_comment: state.gonggao.is_hide_comment,
    leaderid: state.gonggao.leaderid,
    logo: state.gonggao.logo,
    name: state.gonggao.name,
    sort: state.gonggao.sort,
    current_refid: state.managernav.current_refid,
  }
}

export default connect(mapStateToProps)(Settings);
