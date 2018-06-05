'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker'

import {
	cdn_url
} from '../../../';

import{
  SERVER_URL
} from '../../../config';

import {
  addarticle,
  editarticle
} from '../../../actions/article';

import Header from '../../../components/manager/header';

import {
  getgonggaocfg
} from '../../../actions/gonggao';

let ue;

class Create extends Component {
	constructor(props) {
		super(props);
		var date = new Date();
		this.state = {
			show_calandar: false,
			showtime: this.props.method=="edit" ? this.props.showtime : date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate(),
			title: this.props.method=="edit" ? this.props.title : "",
			desc: this.props.method=="edit" ? this.props.desc : "",
			content: this.props.method=="edit" ? this.props.content : ""
		};
	}

	toggleCalandar(){
		this.setState({show_calandar:!this.state.show_calandar});
	}

	componentDidMount(){
		const {refid,uid,token,dispatch} = this.props;
	    var E = require('wangeditor');
	    // 创建编辑器
	    ue = new E('#editor');
	    ue.customConfig.uploadImgServer = "//"+SERVER_URL+'/imageup.jsp';
	    // 将图片大小限制为 3M
	    ue.customConfig.uploadImgMaxSize = 5 * 1024 * 1024;
	    // 限制一次最多上传 1 张图片
			ue.customConfig.uploadImgMaxLength = 1;
			// 关闭粘贴样式的过滤
			ue.customConfig.pasteFilterStyle = false;
	    ue.customConfig.uploadFileName = 'upfile';
	    ue.create();
		if(!(this.props.method=="edit")){
			getgonggaocfg(refid,uid,token,dispatch);
		}
	}

  handleSubmit(){
    jQuery(".alert-success").hide();
    jQuery(".alert-danger").hide();
    let title = jQuery(this.refs.title).val();
    if(jQuery.trim(title) == ''){
      this.showerror('title','标题不能为空');
      return;
    }
    if(title.length<4 || title.length>50){
      this.showerror('title','标题长度不合规范');
      return;
    }
    let desc = jQuery(this.refs.desc).val();
    if(jQuery.trim(desc) == ''){
      this.showerror('desc','需填写描述信息');
      return;
    }
    if(desc.length<4 || desc.length>500){
      this.showerror('desc','描述文字长度不合规范');
      return;
    }
    let content = ue.txt.html();
    let content_txt = ue.txt.text();
    if(jQuery.trim(content_txt) == ''){
      this.showerror('content','文章内容还没有');
      return;
    }
		console.log(content_txt.length);
    if(content_txt.length<4 || content_txt.length>100000){
      this.showerror('content','文章长度长度不合规范');
      return;
    }
    $(this.refs.btn).button('loading');
  	if(this.props.method=="edit"){
  		editarticle(this.props.id,title,desc,content,jQuery('input[name="is_allow_comment"]:checked ').val(),jQuery('input[name="is_hide_comment"]:checked ').val() ,jQuery('input[name="is_top"]:checked ').val(),this.state.showtime, this.props.uid, this.props.token, this.props.dispatch, () => {
  		  jQuery(".alert-success").show();
  		  jQuery(".alert-success").text("操作成功");
  		  $(this.refs.btn).button('reset');
  		});
  	}else{
  		addarticle( this.props.refid, title, desc, content, content_txt, jQuery('input[name="is_allow_comment"]:checked ').val(), jQuery('input[name="is_hide_comment"]:checked ').val(), jQuery('input[name="is_top"]:checked ').val(), this.state.showtime, this.props.uid, this.props.token, this.props.dispatch, () => {
  		  jQuery(".alert-success").show();
  		  jQuery(".alert-success").text("操作成功");
  		  ue.txt.clear();
  		  jQuery(this.refs.title).val('');
  		  jQuery(this.refs.desc).val('');
  		  $(this.refs.btn).button('reset');
  		  this.setState({showtime:''});
  		});
  	}
  }
  showerror(ref, msg){
    jQuery(".alert-danger").show();
    jQuery(".alert-danger").text(msg);
    jQuery(this.refs[ref+"_msg"]).html("<font color='red'>"+msg+"</font>");
    jQuery(this.refs[ref]).css("border-color","red");
  }

  onGetdate(dateString, { dateMoment, timestamp }) {
	  this.setState({showtime: dateString});
	  this.toggleCalandar();
	}

  render(){

    return (
      <div className="animated bounceInRight" style={{height: "100%", backgroundColor:"#fff"}}>
        <div style={{display:"flex",flexDirection:"column",height: "100%",padding:"22px 27px",border:"1px solid #ccc",width:"800px",borderRightWidth:"0px"}}>
          <Header title={this.props.method=="edit" ? "编辑文章":"发布文章"} />
          <div className="help_center">
          	<p>
          		注意事项:
          	</p>
          	<p>
          		1.论坛首页banner图根据文章内容的<em>最后一张</em>图片生成,因此文章至少需要有一张图片,并且最后一张图片尺寸最好与首页图片显示比例一致
          	</p>
          	<p>
          		2.由于该编辑器的兼容问题,在IE浏览器上可能会出现无法上传图片的问题,建议您使用非IE浏览器
          	</p>
          </div>
					<div className="admin_form">
						<div className="alert alert-success" style={{display:"none"}}>
						</div>
						<div className="alert alert-danger" style={{display:"none"}}>
						</div>

						 <label>文章标题 <i ref="title_msg"></i></label>
						 <div className="row">
							 <div className="input_area" style={{width:"700px"}}>
								 <input type="text" ref="title" placeholder="文章标题" style={{width:"550px"}} value={this.state.title} onChange={(e)=>this.setState({"title":e.target.value})} />
							 </div>
							 <p></p>
						 </div>

						 <label>一句话描述 <i ref="desc_msg"></i></label>
						 <div className="row">
							 <div className="input_area" style={{width:"700px"}}>
								 <textarea ref="desc" placeholder="一句话描述" style={{width:"550px"}} onChange={(e)=>this.setState({"desc":e.target.value})}>{this.state.desc}</textarea>
							 </div>
							 <p></p>
						 </div>

 						<label>详细内容 <i ref="content_msg"></i></label>
 						<div className="row" style={{height:"560px"}}>
 						   <div className="input_area" style={{width:"750px"}}>
 							 <div id="editor" dangerouslySetInnerHTML={{__html: this.state.content}} style={{width:"100%",minHeight:"490px"}}></div>
 						   </div>
 						</div>

						 <label>展示时间 <i ref="showtime_msg"></i></label>
						 <div className="row">
							 <div className="input_area" style={{width:"700px"}}>
			{this.state.show_calandar?
								 <Calendar
								  dateFormat="YYYY-MM-DD"
								  date={this.state.showtime}
								  onChange={this.onGetdate.bind(this)}
								/>:
								 <input onClick={this.toggleCalandar.bind(this)} type="text" ref="showtime" style={{width:"250px"}} readOnly="true" value={this.state.showtime} />
      }
							 </div>
							 <p></p>
						 </div>

						 <label>文章置顶</label>
						 <div className="row">
							{
							this.props.is_top2 === true || this.props.is_top2=="1" ?
								<div className="input_area">
									<input type="radio" name="is_top" value="1" defaultChecked="checked" />是
									<input type="radio" name="is_top" value="0" />否
								</div>
							:
								<div className="input_area">
									<input type="radio" name="is_top" value="1" />是
									<input type="radio" name="is_top" value="0" defaultChecked="checked" />否
								</div>
							}
								<p>否允许员工评论您在该模块发表的帖子</p>
						 </div>

						 <label>是否允许评论</label>
						 <div className="row">
						 {
							 this.props.method=="edit" ?
							 this.props.is_allow_comment2 === true || this.props.is_allow_comment2=="1" ?
										<div className="input_area">
										  <input type="radio" name="is_allow_comment" value="1" defaultChecked="checked" />是
										  <input type="radio" name="is_allow_comment" value="0" />否
										</div>
							 :
										<div className="input_area">
										  <input type="radio" name="is_allow_comment" value="1" />是
										  <input type="radio" name="is_allow_comment" value="0" defaultChecked="checked" />否
										</div>
							 :
							 this.props.is_allow_comment === true || this.props.is_allow_comment=="1" ?
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
						 {
							 this.props.method=="edit" ?
							 this.props.is_hide_comment2 === true || this.props.is_hide_comment2=="1" ?
										<div className="input_area">
										  <input type="radio" name="is_hide_comment" value="1" defaultChecked="checked" />是
										  <input type="radio" name="is_hide_comment" value="0" />否
										</div>
							 :
										<div className="input_area">
										  <input type="radio" name="is_hide_comment" value="1" />是
										  <input type="radio" name="is_hide_comment" value="0" defaultChecked="checked" />否
										</div>
							 :
							 this.props.is_hide_comment === true || this.props.is_hide_comment=="1" ?
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

						<button ref="btn" onClick={this.handleSubmit.bind(this)} type="button" className="btn btn-info" style={{width:"80px", alignSelf:"center"}} data-loading-text={this.props.method=="edit"?"正在保存":"正在发布"}>{this.props.id>0?"修改":"发布"}</button>
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
    is_allow_comment: state.gonggao.is_allow_comment,
    is_hide_comment: state.gonggao.is_hide_comment,
	id: state.article.id,
	title: state.article.title,
	desc: state.article.desc,
	content: state.article.content,
	showtime: state.article.showtime,
	is_top2: state.article.is_top,
    is_allow_comment2: state.article.is_allow_comment,
    is_hide_comment2: state.article.is_hide_comment
  }
}

export default connect(mapStateToProps)(Create);
