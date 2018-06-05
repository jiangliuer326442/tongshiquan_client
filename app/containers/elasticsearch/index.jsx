'use strict';

require('./less/elastic.less');

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Links from '../../components/elasticsearch/links';
import Addlink from '../../components/elasticsearch/addlink';

class Elastic extends Component {
  render() {
    return (
      <div className="elaticbox">
				<div className="leftmenu">
					<Links />
				</div>
				<Addlink />
      </div>
    );
  }
}

export default connect()(Elastic);
