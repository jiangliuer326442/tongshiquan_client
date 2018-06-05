'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {getarticle} from '../../actions/article';
import {getcomments_flat} from '../../actions/comment';
import {init_innermsg} from '../../actions/innermsg';
import {makecare} from '../../actions/care';
import UserLink from '../../components/user/info/UserLink';
import Navbar from '../../components/company/navbar';
import Reply from '../../components/tieba/reply';
import Create from '../../components/innermsg/create';

require('./less/detail.less');

class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			pagenum: 10,
			list: []
		};
	}

  componentDidMount(){
    const {uid,token,dispatch} = this.props;
	let companyid = this.props.params.companyid;
	let aid = this.props.params.aid;
    getarticle(uid,token,companyid,aid,dispatch,function(){});
	getcomments_flat(aid, companyid, this.state.page, this.state.pagenum, uid, token, dispatch, function() {}.bind(this));
  }

	handleInnermsg(uid,uname){
		init_innermsg(this.props.uid, uid, uname, this.props.dispatch);
	}
	
	handleCare(touid){
		const {uid,token,dispatch} = this.props;
		makecare(touid,uid,token,dispatch,function(){});
	}

  render() {
    return (
      <div>
        <Navbar companyid={this.props.params.companyid} />
				<table className="postdetail table table-bordered">
					<tbody>
						<tr>
							<td className="readtimes"><em>{this.props.readtimes}</em><br />阅读</td>
							<td className="replynums"><em>{this.props.commenttimes}</em><br />回复</td>
							<td className="title">{this.props.title}</td>
						</tr>
						<tr>
							<td colSpan="2">
								<div className="username">
									<UserLink uid={this.props.article_uid}>{this.props.nick}</UserLink>
								</div>
								<div className="avatar">
									<img src={this.props.avatar} />
									{this.props.article_uid != this.props.uid ?
										<div className="interact">
											<Link data-toggle="modal" data-target="#innermsgModal" onClick={this.handleInnermsg.bind(this, this.props.article_uid, this.props.nick)}>发私信</Link>
											{this.props.care_flg ?
											<Link className="uncare" onClick={this.handleCare.bind(this,this.props.article_uid)}>已关注</Link>
											:
											<Link className="care" onClick={this.handleCare.bind(this,this.props.article_uid)}>关注</Link>
											}
										</div>
									: null}
								</div>
							</td>
							<td>
								<div className="date">楼主  发表于: {this.props.inserttime}</div>
								<div className="content" dangerouslySetInnerHTML={{__html: this.props.content.replace(/\/"/g,'"').replace(/[\r\n]/g, "")}}></div>
							</td>
						</tr>
{!this.props.is_hide_comment ?
	this.props.list.map((item,index) => {
		return (
							<tr>
								<td colSpan="2">
									<div className="username">
										<UserLink uid={item.uid}>{item.uid==this.props.uid ? "我":item.nick}</UserLink>
									</div>
									<div className="avatar">
										<img src={item.avatar} />
										{item.uid != this.props.uid ?
											<div className="interact">
												<Link data-toggle="modal" data-target="#innermsgModal" onClick={this.handleInnermsg.bind(this, item.uid, item.nick)}>发私信</Link>
												{
												item.care_flg ?
												<Link className="uncare" onClick={this.handleCare.bind(this,item.uid)}>已关注</Link>
												:
												<Link className="care" onClick={this.handleCare.bind(this,item.uid)}>关注</Link>
												}
											</div>
										: null}
									</div>
								</td>
								<td>
									<div className="date">{index+1}楼  发表于: {item.time}</div>
									<div className="content" dangerouslySetInnerHTML={{__html: item.comment}}></div>
								</td>
							</tr>
		)
	})
:null}
{this.props.is_allow_comment ?
						<Reply aid={this.props.params.aid} />
:null}
					</tbody>
				</table>
				<Create />
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
    id: state.article.id,
    title: state.article.title,
	care_flg: state.article.care_flg,
    content: state.article.content,
	is_allow_comment: state.article.is_allow_comment,
	is_hide_comment: state.article.is_hide_comment,
    inserttime: state.article.inserttime,
	commenttimes: state.article.commenttimes,
	readtimes: state.article.readtimes,
	avatar: state.article.avatar,
	article_uid: state.article.uid,
	nick: state.article.nick,
	list: state.comment.list,
	refresh: state.comment.refresh,
  }
}

export default connect(mapStateToProps)(Detail);
