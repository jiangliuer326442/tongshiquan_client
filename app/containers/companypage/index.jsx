'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

require('./less/company.less');
import Navbar from '../../components/company/navbar';
import Gongsixinwen from '../../components/company/gongsixinwen';
import Qitagonggao from '../../components/company/qitagonggao';
import Posts from '../../components/tieba/posts';
import Tieba from '../../components/tieba';

class Company extends Component {
	
  render() {
    return (
      <div>
        <Navbar companyid={this.props.params.companyid} />
        <Gongsixinwen companyid={this.props.params.companyid} />
				<div style={{display:"flex", marginTop:"10px"}}>
					<Qitagonggao companyid={this.props.params.companyid} />
					<Posts companyid={this.props.params.companyid} />
				</div>
        <Tieba companyid={this.props.params.companyid} />
      </div>
    );
  }
}

export default connect()(Company);
