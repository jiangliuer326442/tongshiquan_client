'use strict';

require("./less/leftbar.less");

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Couple extends Component {

	render() {
		let url = window.location.pathname.split("/")[1];
    	return (
			<ul>
				<li className={url=="couple"?"current":""}>
					<Link to="/couple"><i className="clubfriends icon--gongsi"></i>公司动态</Link>
				</li>
				<li>
					<Link><i className="clubfriends icon--iconfonthaoyou"></i>好友动态</Link>
				</li>
				<li className={url=="mycouple"?"current":""}>
					<Link to="mycouple"><i className="clubfriends icon--gerenzhongxinxia"></i>个人中心</Link>
				</li>
				<li className={url=="mytwtmsg"?"current":""}>
					<Link to="mytwtmsg"><i className="clubfriends icon--yuwoxiangguan-copy"></i>与我相关</Link>
				</li>
			</ul>
		)
	}
}

function mapStateToProps(state) {
  return {
		companyid: state.login.companyid,
    uid: state.login.uid,
		token: state.login.token,
  }
}

export default connect(mapStateToProps)(Couple);
