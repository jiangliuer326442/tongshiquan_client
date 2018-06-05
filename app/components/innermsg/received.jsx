'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Toast from '../../components/common/toast';
import {
  innermsg_received,
  push_sendedmsg,
  send_innermsg,
  innermsg_setreadflg
} from '../../actions/innermsg';

/**
 * 获取收到的站内信
 */
class Received extends Component { 
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
		innermsg_received(this.state.page, this.state.pagenum,uid,token,dispatch);
	}

	setReadflg(id){
		const {uid,token,dispatch} = this.props;
		let read_flg;
		for(let i=0; i<this.props.receivedlist.length; i++){
			if(this.props.receivedlist[i].id == id){
				read_flg = this.props.receivedlist[i].read_flg;
				break;
			}
		}
		if(!read_flg){
			innermsg_setreadflg(id, uid,token,dispatch);
		}
	}

	showreply(touid,event){
		this.setState({reply_uid: touid});
		$(event.target).parents(".msgitem").find(".reply-box").fadeIn();
	}
	
	handleReply(index,event){
		let innermsg = {};
		innermsg.content = $(event.target).parents(".msgitem").find(".reply_content").val();
		if(innermsg.content != ""){
	    if(innermsg.content.length<4){
				new Toast({message: "内容过短"}).show();
			}else if(innermsg.content.length>100){
				new Toast({message: "内容过长"}).show();
			}else{
				let selected_received = this.props.receivedlist[index];
				innermsg.create_time = "刚刚";
				innermsg.id = 0;
				innermsg.to_uid = selected_received.from_uid;
				innermsg.user_avatar = selected_received.user_avatar;
				innermsg.username = selected_received.username;
				send_innermsg(innermsg.to_uid, innermsg.content, this.props.uid, this.props.token, this.props.dispatch, function(){
					new Toast({message: "回复成功"}).show();
					push_sendedmsg(innermsg,this.props.dispatch);
				}.bind(this));
			}
		}else{
			new Toast({message: "内容为空"}).show();
		}
		this.setState({reply_uid: 0});
	}
	
	render(){
		return(		
						<div className="msglist">
						{
							this.props.receivedlist.map((item,index)=>{
								return (
								<div className={"msgitem "+(item.read_flg?"hasread":"")} onClick={this.setReadflg.bind(this, item.id)} key={item.id}>
									<img src={item.user_avatar} className="avatar" />
									<div className="body">
										<div className="line">
											<span className="username"><Link data-uid={item.from_uid}>{item.username}</Link></span>
											<span className="date">{item.create_time}</span>
										</div>
										<div className="content">
											{item.content}
											&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;<Link onClick={this.showreply.bind(this,item.from_uid)}>回复</Link>
										</div>
										<div className="reply-box" style={{display:item.from_uid==this.state.reply_uid?"block":"none"}}>
											<div className="reply">
												<textarea className="reply_content" placeholder={"回复 "+item.username}></textarea>
												<input type="button" onClick={this.handleReply.bind(this,index)} value="提交" />
											</div>
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
		receivedlist: state.innermsg.receivedlist,
  }
}

export default connect(mapStateToProps)(Received);
