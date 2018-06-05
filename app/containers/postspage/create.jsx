'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	history
} from '../../';

import{
  SERVER_URL
} from '../../config';

import {
  addpost
} from '../../actions/post';
import Navbar from '../../components/company/navbar';

require('./less/create.less');

let ue;

class Create extends Component {

  componentDidMount(){
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
  }

	handleSubmit(event){
		event.preventDefault();
    jQuery(".alert-success").hide();
    jQuery(".alert-danger").hide();
    let title = jQuery(this.refs.title).val();
    if(jQuery.trim(title) == ''){
      this.showerror('标题不能为空');
      return false;
    }
    if(title.length<4 || title.length>50){
      this.showerror('标题长度不合规范');
      return false;
    }
    let content = ue.txt.html();
    let content_txt = ue.txt.text();
    if(jQuery.trim(content_txt) == ''){
      this.showerror('文章内容还没有');
      return;
    }
    if(content_txt.length<4 || content_txt.length>50000){
      this.showerror('文章长度长度不合规范');
      return;
    }
    $(this.refs.btn).button('loading');
		addpost( this.props.params.lid, title, content, content_txt, this.props.uid, this.props.token, this.props.dispatch, () => {
			jQuery(".alert-success").show();
			jQuery(".alert-success").text("发帖成功");
			ue.txt.clear();
			$(this.refs.btn).button('reset');
			history.push("/posts/"+this.props.params.companyid+"/"+this.props.params.lid);
		});
	}
	
  showerror(msg){
    jQuery(".alert-danger").show();
    jQuery(".alert-danger").text(msg);
  }

  render() {
    return (
      <div className="ctieba">
        <Navbar companyid={this.props.params.companyid} />
				<form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal" role="form">
					<div className="alert alert-success" style={{display:"none"}}>
					</div>
					<div className="alert alert-danger" style={{display:"none"}}>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">标题</label>
						<div className="col-sm-10">
							<input type="text" className="form-control" ref="title" placeholder="用一句简单的话表单帖子核心内容" />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">描述</label>
						<div className="col-sm-10">
							<div id="editor" style={{width:"100%",minHeight:"300px"}}></div>
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button className="btn btn-primary" data-loading-text="正在发帖">发表帖子</button>
						</div>
					</div>
				</form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token
  }
}

export default connect(mapStateToProps)(Create);
