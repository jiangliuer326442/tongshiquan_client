'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

require("../../static/jquery-browser");
require("../../static/jquery-qqface/js/jquery.qqFace");

require('./less/comment.less');

import Commentlist from './commentlist';

import {
  cdn_url
} from '../../';

import {
    calculatewords,
    addcomment,
		getcomments,
		showcomment
    } from '../../actions/comment';

class Comment extends Component {
	  componentWillReceiveProps(nextProps){
			this.initqqface(nextProps);
		}
		
		componentDidMount(){
			this.initqqface(this.props);
		}
		
		initqqface(props){
			if(props.is_allow_comment){
				//表情组件
				var emotion = this.refs.emotion;
		    $(emotion).qqFace({
		        assign:'saytext',
		        path:cdn_url+'/library/jQuery-qqFace/arclist/',
		        id:"facebox",
		        total:75,
		        row:13,
		        cb: function(){

		        }
		    });
			}
		}

		chgcomment(){
			let comment_content = $(this.refs.comment).val();
			if(comment_content.length > 0){
				calculatewords(comment_content,this.props.dispatch);
				$(this.refs["remain-box"]).css("visibility","visible");
				$(this.refs.addbtn).addClass("btn_on");
			}else{
				$(this.refs["remain-box"]).css("visibility","hidden");
				$(this.refs.addbtn).removeClass("btn_on");
			}
		}

    addComment(){
        if($(this.refs.addbtn).hasClass("btn_on")){
            const {uid,token,dispatch,aid,companyid,avatar,uname} = this.props;
            let comment_content = $(this.refs.comment).val();
            addcomment(aid,comment_content,avatar,uname,uid,token,dispatch,(status)=>{
						});
            $(this.refs.comment).val("");
        }
    }

		render(){
			return      <div className="comment">
										<div className="comment_addbox">
												<div className="header">
														<img src={require("./img/u41.png")} className="cross" onClick={()=>showcomment(false,this.props.dispatch)} />
														<img src={require("./img/u43.png")} style={{marginLeft: "2em"}} />
														<div className="pull-right">
																<em>{this.props.commenttimes}</em> 条评论
																|
																<em>{this.props.readtimes}</em> 人阅读
														</div>
												</div>
												<div className="body">
														<div className="left">
																<img src={this.props.avatar} className="img-circle" />
																{this.props.uname}
														</div>
														{this.props.is_allow_comment?
														<textarea id="saytext" ref="comment" placeholder={!this.props.is_hide_comment?"文明社会，理性发言":"认真发表，评论不对外公开"} onChange={this.chgcomment.bind(this)} />
														:
														<textarea id="saytext" ref="comment" placeholder="文章禁止评论" disabled="disabled" style={{cursor:"not-allowed"}} />
														}

												</div>
												<div className="foot">
														<a ref="emotion" role="button" className="btn btn-default" href="javascript:;">
																<span className="icon clubfriends icon--face"></span>
																<span className="caret"></span>
														</a>
														<em ref="remain-box" className="remain-box">您还可以输入<i ref="remain" className="remain">{this.props.remainwords}</i>字</em>
														<button ref="addbtn" onClick={this.addComment.bind(this)} type="button" className="btn btn-default">发布</button>
												</div>
										</div>
									{!this.props.is_hide_comment ?
										<Commentlist aid={this.props.aid} companyid={this.props.companyid} />
									: null}
									</div>
		}
}

function mapStateToProps(state) {
  return {
		uid: state.login.uid,
		token: state.login.token,
		avatar: state.company.avatar,
		uname: state.company.uname,
		commenttimes: state.article.commenttimes,
		readtimes: state.article.readtimes,
		remainwords: state.comment.remainwords,
	  is_hide_comment: state.article.is_hide_comment,
	  is_allow_comment: state.article.is_allow_comment
  }
}

export default connect(mapStateToProps)(Comment);
