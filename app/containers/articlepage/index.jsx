'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

require('./less/article.less');
import Navbar from '../../components/company/navbar';
import Share from '../../components/article/share';
import Comment from '../../components/article/comment';
import ArticleList from '../../components/article/articlelist';

import {getarticle} from '../../actions/article';
import {showcomment} from '../../actions/comment';
import {server_url} from '../../';

class Article extends Component {
  componentDidMount(){
	this.getarticle(this.props);
  }
  
  componentWillReceiveProps(nextProps){
	this.getarticle(nextProps);  
  }
  
  getarticle(props){
    const {uid,token,dispatch} = props;
    getarticle(uid,token,props.params.companyid,props.params.aid,dispatch,function(){
		
	}); 
  }
  
  render() {
    return (
      <div>
        <Navbar companyid={this.props.params.companyid} />
        <div className="article">
          <h2>{this.props.id == this.props.params.aid ? this.props.title : ""}</h2>
          <div className="lead">
						<div className="main">
							<Share title={this.props.title} url={server_url+"/article/"+this.props.params.companyid+"/"+this.props.params.aid} />
							<em className="commentnum">{this.props.commenttimes}</em><span className="commenttext">评论</span>
							<span className="glyphicon glyphicon-edit"
								onClick={()=>showcomment(!this.props.showcomment,this.props.dispatch)}
							></span>
						</div>
						<div className="date">
							<span className="pull-right">{this.props.inserttime}</span>
						</div>
          </div>
          <div className="mainbox">
            <div className="content" dangerouslySetInnerHTML={{__html: this.props.content}}></div>
						<div className="subbox">
					{
						this.props.showcomment ?
						<Comment aid={this.props.params.aid} companyid={this.props.params.companyid}/> :
						<ArticleList aid={this.props.params.aid} companyid={this.props.params.companyid} pagenum="10" />
					}
						</div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
    id: state.article.id,
    title: state.article.title,
    content: state.article.content,
    inserttime: state.article.inserttime,
    is_allow_comment: state.article.is_allow_comment,
    is_hide_comment: state.article.is_hide_comment,
	commenttimes: state.article.commenttimes,
	showcomment: state.comment.showcomment,
  }
}

export default connect(mapStateToProps)(Article);
