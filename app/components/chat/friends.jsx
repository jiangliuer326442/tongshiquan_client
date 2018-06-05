'use strict';

/**
 * 好友列表
 */

require('./less/friends.less');

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	friendslist,
	selectfriend
} from '../../actions/friendslist';

class Friends extends Component {

	componentDidMount(){
		const {uid,token,dispatch} = this.props;
		if(this.props.list.length == 0){
			friendslist(uid,token,dispatch);
		}
	}
	
	handleSelectfriend(touid,touname,toavatar){
		const {uid,token,dispatch} = this.props;
		selectfriend(touid,touname,toavatar,uid,token,dispatch);
	}

  render(){
    return (
			<div>
{
	this.props.list.length>0?
	(
		this.props.list.map((item, index) => {
			return (
				<div key={item.fletter} className="group">
					<h4>{item.fletter}</h4>
					<ul className="userlist">
	{
	item.list.map((item2, index2) => {
		return (
						<li key={item2.friend_uid} onClick={this.handleSelectfriend.bind(this,item2.friend_uid,item2.username,item2.avatar)} className={(item2.friend_uid==this.props.selected?"current":"")+" useritem"}>
							<img src={item2.avatar} className="avatar" />
							<span className="username">{item2.username}</span>
						</li>
		)
	})
	}
					</ul>
				</div>
			)
		})
	):
				<div className="loadingcontent">
					<p>相互关注后即可成为好友,即使您离开了公司,依然可以在这里找到Ta</p>
					<p>还没有好友?从关注他人开始吧!</p>
				</div>
}
			</div>
		)
  }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
		token: state.login.token,
		list: state.chat.sortedfriendlist,
		selected: state.chat.selectedfrienduid,
		fresh: state.chat.fresh
  }
}

export default connect(mapStateToProps)(Friends);
