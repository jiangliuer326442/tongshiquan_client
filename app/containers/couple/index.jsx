'use strict';

require('./less/index.less');

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/company/navbar';
import Left from '../../components/couple/left';
import SendTwitter from '../../components/couple/sendtwitter';
import Twtlist from '../../components/couple/twtlist';

import {
  NAV_2
} from '../../actions/navbar';

/**
 * 同事圈
 */
class Couple extends Component {

	render() {
    return (
			<div>
				<Navbar nav_default={NAV_2} companyid={this.props.companyid} />
				<div className="couple">
					<div className="left">
						<Left />
					</div>
					<div className="mainbody">
            			<SendTwitter />
            			<Twtlist />
					</div>
					<div className="ads">dfgdfg
					</div>
				</div>
			</div>
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
