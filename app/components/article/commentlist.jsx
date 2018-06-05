'use strict';

import React, {
	Component
} from 'react';
import { connect } from 'react-redux';

require('./less/commentlist.less');

import {
	getcomments_flat,
	setreply,
	calculatewords,
	setreplycontent,
	addreply,
	editzan
} from '../../actions/comment';
import {
  cdn_url
} from '../../';

class Commentlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			pagenum: 10,
			list: [],
			handlemore_flg: false
		};
	}
	componentDidMount() {
		const {
			uid,
			token,
			dispatch
		} = this.props;
		getcomments_flat(this.props.aid, this.props.companyid, this.state.page, this.state.pagenum, uid, token, dispatch, function() {}.bind(this));
	}
	handleMore() {
		const {
			uid,
			token,
			dispatch
		} = this.props;
		let page = this.state.page + 1;
		this.setState({
			handlemore_flg: true,
			page: page
		});
		getcomments_flat(this.props.aid, this.props.companyid, page, this.state.pagenum, uid, token, dispatch, function() {}.bind(this));
	}
	componentWillReceiveProps(nextProps) {
		let list;
		if(this.state.handlemore_flg) {
			list = this.state.list.concat(nextProps.list);
		} else {
			list = nextProps.list;
		}
		this.setState({
			list: list,
			handlemore_flg: false
		});
	}
	refresh() {
		const {
			uid,
			token,
			dispatch
		} = this.props;
		getcomments_flat(this.props.aid, this.props.companyid, 1, this.state.page * this.state.pagenum, uid, token, dispatch, function() {

		}.bind(this));
	}
	handleReply(index) {
		let comment = this.state.list[index];
		let cid = comment.id;
		let aid = this.props.aid;
		setreply(aid, cid, this.props.dispatch);
	}
	handleZan(index) {
		let comment = this.state.list[index];
		let cid = comment.id;
		const {
			dispatch,
			uid,
			token
		} = this.props;
		editzan(cid, uid, token, index, dispatch);
	}
	setReplycontent(e) {
		let comment_content = e.target.value;
		const {
			dispatch
		} = this.props;
		if(comment_content.length > 0) {
			calculatewords(comment_content, dispatch);
			$(this.refs["remain-box"]).css("visibility", "visible");
			$(this.refs.addbtn).addClass("btn_on");
		} else {
			$(this.refs["remain-box"]).css("visibility", "hidden");
			$(this.refs.addbtn).removeClass("btn_on");
		}
		setreplycontent(comment_content, dispatch);
	}
	addReply() {
		const {
			uid,
			token,
			dispatch
		} = this.props;
		addreply(this.props.aid, this.props.reply.cid, this.props.reply.content, uid, token, dispatch, (status) => {
			if(status == 200) {
				this.refresh();
			}
		});
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
	render() {
		return <div className="comment_listbox">
                    <h4>最新评论<small onClick={this.refresh.bind(this)}>刷新</small></h4>
            {this.state.list.map((item,index) => {
                return (
                    <div className="commentItem">
												<div className="comment_box">
													<img className="avatar" src={item.avatar} />
													<div className="body">
															<div className="nickname">{item.nick}</div>
															<div className="comment_content" dangerouslySetInnerHTML={{__html: this.replace_em(item.comment)+(item.to?"//<span style='color:#ff8500;'>@"+item.to+"：</span>"+this.replace_em(item.to_content):"")}}></div>
															<div className="otherinfo">
																	<div className="date">{item.time}</div>
																	{
																		item.id > 0 && this.props.is_allow_comment && this.props.uid>0 ? 
																		<div className="operation_area">
																				{item.iszan == 1 || item.iszan == true ? 
																				<div title="赞" className="zan">
																					<i className="icon clubfriends icon--zan01"></i>
																				</div>
																				:
																				<div title="赞" className="zan" onClick={this.handleZan.bind(this,index)}>
																					<i className="icon clubfriends icon--zan"></i>
																				</div>
																				}
																				<div onClick={this.handleReply.bind(this,index)} title="回复" className="reply"><i className="glyphicon glyphicon-envelope"></i></div>
																		</div>
																		: null
																	}
															</div>
													</div>
												</div>
											{
												this.props.aid == this.props.reply.aid && this.props.reply.cid == item.id && this.props.reply.is_reply ?
												<div className="reply_box">
													<img className="avatar" src={this.props.avatar} />
													<div className="body">
														<textarea onChange={this.setReplycontent.bind(this)} placeholder={"回复"+item.nick+"："}>{this.props.reply.content}</textarea>
														<div className="foot">
															<em className="remain-box" ref="remain-box">
																<span>您还可以输入</span><i className="remain">{this.props.remainwords}</i>
																<span>字</span>
															</em>
															<button ref="addbtn" type="button" className={this.props.reply.content != "" ? "btn btn-default btn_on" : "btn btn-default"} onClick={this.addReply.bind(this)}>发布</button>
														</div>
													</div>
												</div>
												: null
											}
                    </div>
                )
            })}
						{
							this.state.page*this.state.pagenum < this.props.num ?
							<i className="more" onClick={this.handleMore.bind(this)}>更多精彩评论&gt;&gt;</i>
							:
							<i className="more" style={{cursor:"default"}}>没有更多评论了</i>
						}
								</div>
	}
}

function mapStateToProps(state) {
	return {
		uid: state.login.uid,
		token: state.login.token,
		avatar: state.company.avatar,
		list: state.comment.list,
		reply: state.comment.reply,
		remainwords: state.comment.remainwords,
		refresh: state.comment.refresh,
		is_allow_comment: state.article.is_allow_comment,
		num: state.comment.num
	}
}

export default connect(mapStateToProps)(Commentlist);