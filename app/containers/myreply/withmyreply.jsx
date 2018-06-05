'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

require('./less/withmycomments.less');

import common from '../../components/common';
import Navbar from '../../components/company/navbar';
import Leftbar from '../../components/company/leftbar';

import {
  NAV_4
} from '../../actions/navbar';
import {
	getwithmycomments
} from '../../actions/comment';

class WithMyreply extends Component {
	
	componentDidMount(){
		const {uid,token,dispatch} = this.props;
		getwithmycomments(uid,token,dispatch,function(){});
	}
	
  render() {
    return (
      <div>
        <Navbar nav_default={NAV_4} companyid={this.props.companyid} />
        <div className="withmyreply">
			<Leftbar />
			<div className="right">
{
	this.props.withmycomments.map((item, index) =>{
		return (
                    <div className="commentItem" key={item.id}>
						<div className="comment_box">
							<img className="avatar" src={item.user_avatar} />
							<div className="body">
									<div className="nickname">{item.user_name}</div>
									<div className="comment_content" dangerouslySetInnerHTML={{__html: item.comment}}></div>
									<div className="otherinfo">
											<div className="date">{item.comment_time.split(' ')[0]}</div>
											<div className="source">
											来源:&nbsp;&nbsp;
											<Link to={"/post/"+this.props.companyid+"/"+item.article_id}>{item.article_title}</Link>
											</div>
									</div>
							</div>
						</div>
                    </div>
		)
	})
}
			</div>
		</div>
	  </div>
	)  
  }					
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
	companyid: state.login.companyid,
	withmycomments: state.comment.withmycomments
  }
}

export default connect(mapStateToProps)(WithMyreply);