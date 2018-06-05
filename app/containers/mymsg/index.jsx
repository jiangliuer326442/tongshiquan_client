'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

require('./less/index.less');

import Navbar from '../../components/company/navbar';
import Leftbar from '../../components/company/leftbar';
import Received from '../../components/innermsg/received';
import Sended from '../../components/innermsg/sended';

import { NAV_4 } from '../../actions/navbar';

class Mymsg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
        };
    }

    render() {
        return (
            <div>
        <Navbar nav_default={NAV_4} companyid={this.props.companyid} />
        <div className="mymsg">
					<Leftbar />
					<div className="right">
						<div className="header">
							<Link className={this.state.tab == 1 ? "current" : ""} onClick={() => this.setState({
                tab: 1,
                page: 1
            })}>私信</Link>
							<Link className={this.state.tab == 2 ? "current" : ""} onClick={() => this.setState({
                tab: 2,
                page: 1
            })}>我发送的</Link>
						</div>
						{
            this.state.tab == 1 ?
                <Received />
                :
                <Sended />
            }

					</div>
        </div>
      </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        companyid: state.login.companyid,
    }
}

export default connect(mapStateToProps)(Mymsg);
