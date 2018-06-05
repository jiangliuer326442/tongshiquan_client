'use strict';

/**
 * 用户信息
 */

require('./less/chatdetail.less');

import {
  cdn_url
} from '../../';
import React, { Component } from 'react';
import { connect } from 'react-redux';

require("../../static/jquery-browser");
require("../../static/jquery-qqface/js/jquery.qqFace");

import {
	say
} from '../../actions/socket';

import {
	getchatlog,
	pushchatfile
} from '../../actions/chat';

class Chatdetail extends Component {
	componentDidMount(){
		this.getchatlog(this.props);
		this.initqqface();
	}
	
	componentWillReceiveProps(nextProps){
		this.getchatlog(nextProps);
		this.initqqface(nextProps);
	}
	
	initqqface(props){
		//表情组件
		var emotion = this.refs.emotion;
		$(emotion).qqFace({
				assign:'saytext',
				path:cdn_url+'/library/jQuery-qqFace/arclist/',
				id:"facebox",
				total:75,
				row:15,
				cb: function(){

				}
		});
	}
	
	replace_em(str) {
		str = str.replace(/</g, '<；');
		str = str.replace(/>/g, '>；');
		str = str.replace(/em_([0-9]*)/g, '<Img src="'+cdn_url+'/library/jQuery-qqFace/arclist/$1.gif" border="0" />');
		str = str.replace(/\[/g, '');
		str = str.replace(/]/g, '');
		return str;
	}
	
	getchatlog(props){
		if(props.list.length == 0 || typeof(props.list[props.selecteduid]) == 'undefined'){
			getchatlog(props.selecteduid, props.page, props.pagenum, props.uid, props.token, props.dispatch, function(){
				setTimeout("$('#chatlog').scrollTop( $('#chatlog')[0].scrollHeight)",100);
			});
		}
	}
	
	handleEdit(event){
		if (event.ctrlKey && event.keyCode == 13) {
			this.sayto();
		}
	}
	
	uploadImg(){
		if(this.refs.imgfile.files.length > 0){
			let file = this.refs.imgfile.files[0];
			const {uid,token,dispatch} = this.props;
			pushchatfile(file,uid,token,dispatch,function(imgurl){
				let to_uid = this.props.selecteduid;
				let content = imgurl;
				say(to_uid, content, "图片", uid, token, dispatch);
				$('#chatlog').scrollTop( $('#chatlog')[0].scrollHeight);
			}.bind(this));
		}
	}
	
	sayto(){
		const {uid,token,dispatch} = this.props;
		let to_uid = this.props.selecteduid;
		let content = $.trim($(this.refs.content).val());
		if(content != "" && content.gblen() <= 100){
			$(this.refs.content).val("");
			say(to_uid, content, "文字", uid, token, dispatch);
			$('#chatlog').scrollTop( $('#chatlog')[0].scrollHeight)
		}
	}
	
	showImg(imgurl){
		$("body").append("<div id=\"img_mask\" style=\"position:fixed;width:100%;height:100%;left:0;top:0; background:rgba(0,0,0,0.8);z-index:999;\" onclick=\"$('#img_mask').remove()\"><img style=\"margin:4% auto; display: block; cursor: pointer;\" onclick=\"event.stopPropagation();\" src=\""+imgurl+"\" height=\"70%\" /></div>");
	}
	
  render(){
    return (
			<div className="userdetail">
				<h2>{this.props.selecteduname}</h2>
				<div id="chatlog" className={"chatlog "+(this.props.list.length>0?"":"nocontents")}>
					{
						this.props.list.length>0 && typeof(this.props.list[this.props.selecteduid]) != 'undefined' ?
							this.props.list[this.props.selecteduid].map((item,index) => {
								return (
									<div className={(item.tuid == this.props.uid ? "yours":"mine")+" chatitem"}>
										<img title={item.tuid == this.props.uid ? this.props.selecteduname:this.props.mynick} src={item.tuid == this.props.uid ? this.props.selectedavatar:this.props.myavatar} className="avatar" />
										{item.content_type=="文字"?<span className="content" dangerouslySetInnerHTML={{__html: this.replace_em(item.content)}}></span>:null}
										{item.content_type=="图片"?<img onClick={this.showImg.bind(this,item.content)} style={{cursor:"pointer"}} src={item.content} className="chatimg" />:null}
									</div>
								)
							}
)
						:
						"暂时没有新消息"
					}
					<div style={{height:"100px"}}></div>
				</div>
				<div className="chattool">
					<i title="表情" ref="emotion" className="clubfriends icon--biaoqing"></i>
					<i title="图片" onClick={()=>$(this.refs.imgfile).click()} className="clubfriends icon--tupian"></i>
					<input type="file" onChange={this.uploadImg.bind(this)} accept="image/*" style={{display:"none"}} ref="imgfile" />
				</div>
				<div className="chatinput">
					<textarea id="saytext" ref="content" onKeyDown={this.handleEdit.bind(this)}></textarea>
				</div>
				<div className="chatsend">
					<em>按下Ctrl+Enter发送</em>
					<button type="button" className="btn btn-default" onClick={this.sayto.bind(this)}>发送</button>
				</div>
			</div>
		)
  }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
		token: state.login.token,
		myavatar: state.user.avatar,
		mynick: state.user.nick,
		selecteduid: state.chat.selectedfrienduid,
		selecteduname: state.chat.selectedfrienduname,
		selectedavatar: state.chat.selectedfriendavatar,
		list: state.chat.chatlog,
		page: state.chat.page,
		pagenum: state.chat.pagenum,
		fresh: state.chat.fresh,
  }
}


export default connect(mapStateToProps)(Chatdetail);
