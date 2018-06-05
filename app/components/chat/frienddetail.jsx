'use strict';

/**
 * 用户信息
 */

require('./less/frienddetail.less');

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from '../../components/user/info/card';

class Frienddetail extends Component {

  render(){
    return (
			<div className="userdetail">
				<h2>详细信息</h2>
				<Card source="chat" selecteduid={this.props.selecteduid} />
			</div>
		)
  }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
		token: state.login.token,
		selecteduid: state.chat.selectedfrienduid
  }
}


export default connect(mapStateToProps)(Frienddetail);
