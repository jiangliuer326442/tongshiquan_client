import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  setsmallkindid
} from '../../../actions/manager';

class Header extends Component {
	handleReturn(){
		this.props.dispatch(setsmallkindid(0)); 
	}
	
  render() {
    return (
			<div className="page-header">
			    <h1>{this.props.title}
			    	{this.props.return_flg?
			    		<small style={{cursor:"pointer"}} onClick={this.handleReturn.bind(this)}>&lt; 返回</small>
			    	:null}
			    </h1>
			</div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default connect()(Header);