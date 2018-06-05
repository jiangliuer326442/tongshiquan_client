'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import WapComponent from '../../components/WapComponent';
import Navbar from '../../components/company/navbar';

class Company extends WapComponent {
	
  render() {
    return (
      <div>
        <Navbar companyid={this.props.params.companyid} />
      </div>
    );
  }
}

export default connect()(Company);
