'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserLink from '../user/info/UserLink';
import Toast from '../common/toast';
import {
  cdn_url
} from '../../';
require('./less/twtitem.less');

import {
	addcomment,
	gettwtlist,
	getmyowntwt,
	hidetwtbyuid,
	deltwt,
	twitter_addzan,
	twitter_addunzan,
	addreply
} from '../../actions/twitter';

class Twtitem extends Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	hide_twitter: -1,//打开的推特隐藏设置项
	  	comment_twitter: -1,//评论的推特
	  	reply_twitter: -1,//回复的推特
	  	reply_comment: -1,//回复的评论
	  };
	}

	replace_em(str) {
		str = str.replace(/</g, '<；');
		str = str.replace(/>/g, '>；');
		str = str.replace(/em_([0-9]*)/g, '<Img src="'+cdn_url+'/library/jQuery-qqFace/arclist/$1.gif" border="0" />');
		str = str.replace(/\[/g, '');
		str = str.replace(/]/g, '');
		str = str.replace(new RegExp('\n',"gm"),'<br/>');
		return str;
	}

	//评论处理
	handleAddComment(twtid, twtindex){
		//获取评论内容
		let comment = $(this.refs['content_'+twtid]).val();
		if(comment.length == 0){
			new Toast({message: "请输入内容"}).show();
			return;
		}
		const {uid, token, dispatch} = this.props;
		addcomment(twtindex, twtid, comment, this.props.avatar, this.props.uname, uid, token, dispatch, ()=>{
			new Toast({message: "评论成功"}).show();
			this.setState({comment_twitter: -1});
		});
	}

	//触发评论
	toggleComment(index){
		if(this.state.comment_twitter == index){
			this.setState({comment_twitter: -1});
		}else{
			this.setState({comment_twitter: index});
		}
	}

	//隐藏指定用户的推特
	hideuidtwt(tuid){
		const {uid, token, pagenum, dispatch} = this.props;
		hidetwtbyuid(tuid, uid, token, (status)=>{
			if(status == 200){
				if(this.props.source == "mytwt"){
					getmyowntwt(1, pagenum, uid, token, dispatch, function(){});
				}else if(this.props.source == "twtlist"){
					gettwtlist(1, pagenum, uid, token, dispatch, function(){});
				}
			}else{
				new Toast({message: "不能屏蔽自己"}).show();
			}
		});
	}

	//删除推特
	deltwt(twt_index, twt_id){
		const {uid, token, dispatch} = this.props;
		deltwt(twt_index, twt_id, uid, token, dispatch);
	}

	//点赞处理
	handleZan(twtid, twtindex){
		const {uid, token, dispatch} = this.props;
		twitter_addzan(twtindex, twtid, uid, token, dispatch);
	}

	handleUnzan(twtid, twtindex){
		const {uid, token, dispatch} = this.props;
		twitter_addunzan(twtindex, twtid, uid, token, dispatch);
	}


	//回复评论处理
	handleAddReply(twtid, twtindex, cmtid){
		let comment = $(this.refs['content_'+twtid+'_'+cmtid]).val();
		if(comment.length == 0){
			new Toast({message: "请输入内容"}).show();
			return;
		}
		const {uid, token, dispatch} = this.props;
		addreply(twtindex, twtid, comment, this.props.avatar, this.props.uname, cmtid, uid, token, dispatch, ()=>{
			new Toast({message: "评论成功"}).show();
			this.setState({
			  	reply_twitter: -1,//回复的推特
			  	reply_comment: -1,//回复的评论
			});
		});
	}

	//触发回复
	toggleReply(twtindex, comnentindex){
		if(this.state.reply_twitter == twtindex && this.state.reply_comment == comnentindex){
			this.setState({reply_twitter: -1, reply_comment: -1});
		}else{
			this.setState({reply_twitter: twtindex, reply_comment: comnentindex});
		}
	}

	render(){
		let item = this.props.twtitem;
		let index = this.props.twtindex;

		let image_list = JSON.parse(item.image);
		let comment_list = item.comment;
		return (
				<div key={index} className="twtitem">
					<div className="head">
						<div className="left">
							<img className="avatar" src={item.avatar?item.avatar:this.props.avatar} />
							<div className="personInfo">
								<div className="username">
									<UserLink uid={item.uid?item.uid:this.props.uid}>{item.nick?item.nick:this.props.nick}</UserLink>
								{
									this.props.source == "twtmsg" ?
									<i className="useraction">{item.type=="zan"?"赞了你":"评论"}</i>
								:null }	
								</div>
								<div className="addtime">
									{item.create_time}
									{this.props.source == "mytwt" ?
									<i className="visible">
										{this.props.visiblels.length>1 && typeof(item.visiblity) != "undefined"?this.props.visiblels[item.visiblity].name:""}
									</i>
									: null}
								</div>
							</div>
						</div>	
						<div className="right">
							{this.props.source != "twtmsg" ?
							(
								this.state.hide_twitter >= 0 && this.state.hide_twitter == index ?
								<i className="glyphicon glyphicon-chevron-down" onClick={()=> this.setState({hide_twitter: -1})} />
								:
								<i className="glyphicon glyphicon-chevron-up" onClick={()=> this.setState({hide_twitter: index})} />
							)
							:null}
							{
								this.state.hide_twitter >= 0 && this.state.hide_twitter == index ?
								<div className="hidebox">
									<ul>
									{this.props.source == "twtlist"?
										<li onClick={()=>hidetwt(index, item.id, this.props.uid, this.props.token, this.props.dispatch)}>
											<i className="glyphicon glyphicon-eye-close" />
											隐藏此动态
										</li>
									:null}
								{
										(this.props.source == "mytwt" ? this.props.uid:item.uid) == this.props.uid ?
										<li onClick={this.deltwt.bind(this, index, item.id)}>
											<i className="glyphicon glyphicon-trash" />
											删除该动态
										</li>
										:
									(
										item.uid != 0 && this.props.source == "twtlist" ?
										<li onClick={this.hideuidtwt.bind(this, item.uid)}>
											<i className="glyphicon glyphicon-user" />
											屏蔽此人
										</li>
										:
										null 
									)
								}	
									</ul>
								</div>	
								: null
							}	
						</div>
					</div>
					<div className="body" dangerouslySetInnerHTML={{__html: this.replace_em(item.content)}}></div>
					<div className="aside">
{
	image_list.length > 0 && image_list[0] != "" ?
						<div className="imglist">
	{
		image_list.map((item2, index2)=>{
			return (
							<div key={index2} className="imgitem">
								<img src={item2} />
							</div>
			)
		})
	}
						</div>
	:
	(
		item.link_id > 0 ?
						<div className="linkto" onClick={()=>window.open(item.link_url)}>
							<h2>
								{item.link_title}
							</h2>
							<p>
								{item.link_content}
							</p>
						</div>
		: null
	)
}					
					</div>
				{this.props.source == "twtlist" ?
					<div className="commentArea">
						<div className="left">
					{
						item.zan_num > 0 ?
							<span className="zan_num">共{item.zan_num}人觉得很赞</span>
						: null
					}
						</div>
						<div className="right">
							<i onClick={this.toggleComment.bind(this, index)} className="clubfriends icon--liaotian"></i>
					{
						item.zan_flg ?
							<i onClick={this.handleUnzan.bind(this, item.id, index)} className="clubfriends icon--yidianzan"></i>
						:
							<i onClick={this.handleZan.bind(this, item.id, index)} className="clubfriends icon--zan"></i>
					}
						</div>						
					</div>
				:null}	
				{
					index == this.state.comment_twitter ?
					<div ref={"commentbox_"+index} className="comment_box">
						<textarea ref={"content_"+item.id} placeholder="评论" />
						<button className="submit_btn" onClick={this.handleAddComment.bind(this,item.id,index)}>发表</button>
					</div>
					: null
				}
			{
				comment_list.length > 0 ?
					<div className="commentls_box">
				{
					comment_list.map((item2, index2)=>{
						return (
						<div key={index2} className="comment">
							<div className="comment_item">
								<img src={item2.avatar} className="avatar" />
								<div className="comment_body">
									<div className="comment_body_core">
										<div className="comment_nick">{item2.nick}</div>
										<div className="comment_content" dangerouslySetInnerHTML={{__html: this.replace_em(item2.content)}}></div>
									</div>
									<div className="comment_date">
										{item2.create_time}
								{
									item2.uid != this.props.uid ?
										<i onClick={this.toggleReply.bind(this,index,index2)} title="点击回复" className="clubfriends icon--huifu"></i>
									:null
								}	
									</div>
								</div>
							</div>
					{
						this.state.reply_twitter == index && this.state.reply_comment == index2 ?
							<div className="reply_item">
								<textarea ref={"content_"+item.id+"_"+item2.id}>{"回复 "+item2.nick+"："}</textarea>
								<button className="submit_btn" onClick={this.handleAddReply.bind(this,item.id,index,item2.id)}>发表</button>
							</div>
						:null
					}
						</div>
						)
					})
				}
					</div>
				:null
			}
				</div>
		)
	}	
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
	token: state.login.token,
	fresh_flg: state.twitter.fresh_flg,
    avatar: state.company.avatar,
    nick: state.company.unick,
    visiblels: state.twitter.visiblels,
  }
}

export default connect(mapStateToProps)(Twtitem);