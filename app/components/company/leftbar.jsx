'use strict';
require('./less/leftbar.less');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/**
 * 导航栏组件
 */
class Leftbar extends Component {
  render() {
		let url = window.location.pathname.split("/")[1];
    return (
			<div className="left">
				<ul>
					<li className={url=="ucenter"?"current":""}><Link to="/ucenter">个人中心</Link></li>
					<li className={url=="mymsg"?"current":""}><Link to="/mymsg">留言通知</Link></li>
					<li className={url=="myarticle"?"current":""}><Link to="/myarticle">发表的帖子</Link></li>
					<li className={url=="myreply"?"current":""}><Link to="/myreply">回复的帖子</Link></li>
					<li className={url=="myattendreply"?"current":""}><Link to="/myattendreply">参与的评论</Link></li>
				</ul>
			</div>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(Leftbar);
