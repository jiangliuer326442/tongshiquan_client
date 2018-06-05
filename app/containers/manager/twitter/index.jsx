'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  setsmallkindid,
  getsmallkindlist
} from '../../../actions/manager';

import List from './list';
import UserList from './userlist';

let current_selected;

 class Twitter extends Component {
	setbgimage(event){
		if(event.target.getAttribute('data-id') != this.props.current_selected){
			jQuery(event.target).toggleClass("current");
		}
	}
	componentDidMount(){
		jQuery(".midkind").mouseover(function(event){
			this.setbgimage(event);
		}.bind(this)).mouseout(function(event){
			this.setbgimage(event);
		}.bind(this));
	}
  //设置当前选中的状态
	setcurrent(event){
		if(event.target.getAttribute('data-id') != this.props.current_selected){
			this.props.dispatch(setsmallkindid(event.target.getAttribute('data-id')));
		}
	}
	render(){
		return (
			<div style={{display: "flex",flexGrow:"1"}}>
				<div className="admingroups">
					<div style={{display:"flex",flexDirection:"column", alignItems: "center",width: "100%"}}>
						<h3>企业说说</h3>
						<ul>
							<li data-id="1" onClick={this.setcurrent.bind(this)} className={"midkind"+(this.props.current_selected==1 ? " current":"")}>说说列表</li>
							<li data-id="2" onClick={this.setcurrent.bind(this)} className={"midkind"+(this.props.current_selected==2 ? " current":"")}>用户管理</li>
            </ul>
          </div>	
				</div>
				{this.props.current_selected == 1 ? <List /> : null }
				{this.props.current_selected == 2 ? <UserList /> : null }
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
    current_selected: state.managernav.current_selected,
	models: state.company.models
  }
}

export default connect(mapStateToProps)(Twitter);
