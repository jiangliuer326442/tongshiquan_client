'use strict';
require('./less/posts.less');
/**
 * 帖子列表组件
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {getallposts} from '../../actions/post';
import common from '../common';

class Posts extends Component {
	componentDidMount(){
		getallposts(this.props.companyid,this.props.dispatch,function(){

		});
	}

	render(){
		return (
			<div className="posts">
				<div className="title">本周帖子</div>
				{this.props.posts.length>0?
				<div className="content">
					<h2><Link className="tieba" to={"/posts/"+this.props.companyid+"/"+this.props.posts[0].sectionid}>【{common.trim(this.props.posts[0].name,8)}】</Link><Link className="post" to={"/post/"+this.props.companyid+"/"+this.props.posts[0].id}>{common.trim(this.props.posts[0].title,36,true)}</Link></h2>
					<p>{common.trim(this.props.posts[0].content_text, 120, true)}</p>
					<ul>
				{
					this.props.posts.map((item,index) => {
						return <li><Link className="tieba" to={"/posts/"+this.props.companyid+"/"+item.sectionid}>【{common.trim(item.name,8)}】</Link><Link className="post" to={"/post/"+this.props.companyid+"/"+item.id}>{common.trim(item.title,36,true)}</Link></li>
					})
				}
					</ul>
				</div>
				:null}
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
		posts: state.post.list
  }
}

export default connect(mapStateToProps)(Posts);
