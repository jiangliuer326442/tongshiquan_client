'use strict';

/**
 * 最近聊天
 */

require('./less/lasttalk.less');

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	selectfriend
} from '../../actions/friendslist';

import {
	getrecentchat
} from '../../actions/chat';

class Lasttalk extends Component {
	
	componentDidMount(){
		const {page,pagenum,uid,token,dispatch} = this.props;
		if(this.props.list.length == 0){
			getrecentchat(page,pagenum,uid,token,dispatch,function(){});
		}
	}

	handleSelectfriend(touid,touname,toavatar){
		const {uid,token,dispatch} = this.props;
		selectfriend(touid,touname,toavatar,uid,token,dispatch);
	}

  render(){
    return (
			<div className="lasttalk">
{ this.props.list.length > 0 ?
					<ul className="userlist">
{
	this.props.list.map((item, index) => {
		return (
						<li key={typeof(item.touid)=='undefined'?item.friend_uid:item.touid} onClick={this.handleSelectfriend.bind(this,typeof(item.touid)=='undefined'?item.friend_uid:item.touid,item.username,item.avatar)} className={((typeof(item.touid)=='undefined'?item.friend_uid:item.touid)==this.props.selected?"current":"")+" useritem"}>
							<img src={item.avatar} className="avatar" />
							<div className="right">
								<span className="username">{item.username}</span>
								{
									item.content != "" ?
									<span className="lastchat">
									{item.content_type == "文字"?item.content:null}
									{item.content_type == "语音"?"您收到一条语音":null}
									{item.content_type == "图片"?"您收到一张图片":null}
									</span>
									:null
								}
							</div>
						</li>
		)
	})
}
					</ul>
:
					<span className="loadingcontent">
						<img src={require('./img/loading.gif')} />
						正在获取最近的聊天
					</span>
}
			</div>
		)
  }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
		token: state.login.token,
		list: state.chat.recentuser,
		selected: state.chat.selectedfrienduid,
		fresh: state.chat.fresh,
		page: state.chat.page,
		pagenum: state.chat.pagenum
  }
}

export default connect(mapStateToProps)(Lasttalk);
