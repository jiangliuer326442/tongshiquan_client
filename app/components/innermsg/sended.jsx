'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {
  innermsg_sended
} from '../../actions/innermsg';

/**
 * 获取发送的站内信
 */
class Sended extends Component { 
	constructor(props){
		super(props);
		this.state = {
			page: 1,
			pagenum: 20,
			reply_uid: 0
		};
 	}
	
	componentDidMount(){
		const {uid,token,dispatch} = this.props;
		innermsg_sended(this.state.page, this.state.pagenum,uid,token,dispatch);
	}
	
	render(){
		return (
			<div className="msglist">
				{
					this.props.sendedlist.map((item,index)=>{
						return (
						<div className="msgitem" key={item.id}>
							<img src={item.user_avatar} className="avatar" />
							<div className="body">
								<div className="line">
									<span className="username"><Link data-uid={item.from_uid}>{item.username}</Link></span>
									<span className="date">{item.create_time}</span>
								</div>
								<div className="content">
									{item.content}
								</div>
							</div>
						</div>
						)
					})
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
		refresh: state.innermsg.refresh,
		sendedlist: state.innermsg.sendedlist
  }
}

export default connect(mapStateToProps)(Sended);