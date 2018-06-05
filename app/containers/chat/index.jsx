'use strict';
require('./less/index.less');

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/company/navbar';

import {
  NAV_3
} from '../../actions/navbar';
import {
	connect as connect_socket
} from '../../actions/socket';

import {
	NAV1,
	NAV2,
	NAV3,
	setnav,
	getchatmsg
} from '../../actions/chat';

import Lasttalk from '../../components/chat/lasttalk';
import Friends from '../../components/chat/friends';
import Company from '../../components/chat/company';
import Frienddetail from '../../components/chat/frienddetail';
import Chatdetail from '../../components/chat/chatdetail';

/**
 * 聊天页面
 */
class Chat extends Component {

	componentDidMount(){
		const {uid, token, dispatch} = this.props;
		jQuery.getScript("https://app.cloopen.com/im50/MD5.min.js");
		jQuery.getScript("https://app.cloopen.com/im50/base64.min.js")
		.done(()=>{	
			jQuery.getScript("http://app.cloopen.com/im50/ytx-web-im-min-new-5.3.2r16.js")  
			.done(()=> {  
				/* 耶，没有问题，这里可以干点什么 */  
				connect_socket(uid, token, dispatch, ()=>{
					RL_YTX.onMsgReceiveListener((obj)=> {
						//收到push消息或者离线消息或判断输入状态
						//如果obj.msgType==12  判断obj.msgDomainn的值
						//obj.msgDomain 0 无输入状态  1 正在输入  2 正在录音
						var content = obj.msgContent.substr(3);
						var from = obj.msgSender;
						var content_type = obj.msgContent.substr(0,2);
						const {uid,token,dispatch} = this.props;
						getchatmsg(from,content,content_type,uid,token,dispatch);
						$('#chatlog').length>0 && $('#chatlog') && $('#chatlog').scrollTop( $('#chatlog')[0].scrollHeight );
					});
					RL_YTX.onConnectStateChangeLisenter(function(obj){
						//连接状态变更
						// obj.code;//变更状态 1 断开连接 2 重连中 3 重连成功 4 被踢下线 5 断开连接，需重新登录
					// 断线需要人工重连
					});
				});
			}) 
		})
	}

	render() {
    return (
			<div>
				<Navbar nav_default={NAV_3} companyid={this.props.companyid} />
				<div className="chat">
					<div className="left">
						<div className="header">
							<img className="avatar" src={this.props.avatar} />
							<b className="nick">{this.props.nick}</b>
						</div>
						<div className="searchbox">
							<span className="glyphicon glyphicon-search"></span>
							<input type="text" className="searchInput" placeholder="搜索" />
						</div>
						<div className="tabs">
							<span title="最近联系人" onClick={()=>setnav(NAV1,this.props.dispatch)} className={(this.props.nav==NAV1 ? "current":"")+" clubfriends icon--liaotian"}></span>
							<span title="好友" onClick={()=>setnav(NAV2,this.props.dispatch)} className={(this.props.nav==NAV2 ? "current":"")+" clubfriends icon--iconfonthaoyou"}></span>
							<span title="公司" onClick={()=>setnav(NAV3,this.props.dispatch)} className={(this.props.nav==NAV3 ? "current":"")+" clubfriends icon--gongsi"}></span>
						</div>
						<div className="tabs_content">
						{this.props.nav == NAV1 ? <Lasttalk /> : null}
						{this.props.nav == NAV2 ? <Friends /> : null}
						{this.props.nav == NAV3 ? <Company /> : null}
						</div>
					</div>
					<div className="right">
					{this.props.nav==NAV1 && this.props.selected>0 ? <Chatdetail /> : null}
					{(this.props.nav==NAV2 || this.props.nav==NAV3) && this.props.selected>0 ? <Frienddetail /> : null}
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
		companyid: state.login.companyid,
    uid: state.login.uid,
		token: state.login.token,
		avatar: state.company.avatar,
		nick: state.company.unick,
		phone: state.user.phone,
		nav: state.chat.nav,
		selected: state.chat.selectedfrienduid,
  }
}

export default connect(mapStateToProps)(Chat);
