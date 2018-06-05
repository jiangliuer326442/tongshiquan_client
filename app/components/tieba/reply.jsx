'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	cdn_url
} from '../../';
import{
  SERVER_URL
} from '../../config';
import {
	addcomment
} from '../../actions/comment';

require('./less/reply.less');

let ue;

class Reply extends Component {
	
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

  showerror(msg){
    jQuery(".alert-danger").show();
    jQuery(".alert-danger").text(msg);
  }

	addComment(){
		const {uid,token,aid,dispatch,myavatar,myuname} = this.props;
    let comment_content = ue.txt.html();
    let content_txt = ue.txt.text();
    if(jQuery.trim(content_txt) == ''){
      this.showerror('请填写评论');
      return;
    }
		$(this.refs.addbtn).button('loading');
		addcomment(aid,comment_content,myavatar,myuname,uid,token,dispatch,(status)=>{
			if(status == 200){
				jQuery(".alert-success").show();
				jQuery(".alert-success").text("发帖成功");
				ue.setContent('', false);
			}else{
				this.showerror("评论失败");
			}
			$(this.refs.addbtn).button('reset');
		});
	}

  render() {
    return (
      <tr>
        <td colSpan="2">
          <div className="avatar">
            <img src={this.props.myavatar} />
          </div>
        </td>
        <td className="reply_box">
          <div className="alert alert-success"></div>
          <div className="alert alert-danger"></div>
					<div id="editor"></div>
          <button ref="addbtn" onClick={this.addComment.bind(this)} className="btn btn-primary" data-loading-text="正在回复">发表回复</button>
        </td>
      </tr>
    )
  }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
		token: state.login.token,
    myavatar: state.company.avatar,
		myuname: state.company.uname,
  }
}

export default connect(mapStateToProps)(Reply);
