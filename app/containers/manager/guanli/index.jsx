'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Glbsettings from './glbsettings.jsx';
import Sendadmin from './sendadmin.jsx';

import {
  setsmallkindid
} from '../../../actions/manager';

 class Guanli extends Component {
	setbgimage(event){
		if(event.target.getAttribute('data-id') != this.props.current_selected){
			jQuery(event.target).toggleClass("current");
		}
	}
  //设置当前选中的状态
	setcurrent(event){
		if(event.target.getAttribute('data-id') != this.props.current_selected){
			this.props.dispatch(setsmallkindid(event.target.getAttribute('data-id')));
		}
	}
	componentDidMount(){
		jQuery(".midkind").mouseover(function(event){
			this.setbgimage(event);
		}.bind(this)).mouseout(function(event){
			this.setbgimage(event);
		}.bind(this));
	}
	render(){
		return (
			<div style={{display: "flex"}}>
				<div className="admingroups">
					<h3>论坛管理</h3>
					<ul>
						<li data-id="1" onClick={this.setcurrent.bind(this)} className={"midkind"+(this.props.current_selected==1 ? " current":"")}>全局设置</li>
					</ul>
					<h3>管理员</h3>
					<ul>
						<li data-id="2" onClick={this.setcurrent.bind(this)} className={"midkind"+(this.props.current_selected==2 ? " current":"")}>添加管理员</li>
						<li data-id="3" onClick={this.setcurrent.bind(this)} className={"midkind"+(this.props.current_selected==3 ? " current":"")}>管理员列表</li>
						<li data-id="4" onClick={this.setcurrent.bind(this)} className={"midkind"+(this.props.current_selected==4 ? " current":"")}>管理员转让</li>
					</ul>
				</div>
        {this.props.current_selected == 1 ? <Glbsettings /> : null}
        {this.props.current_selected == 4 ? <Sendadmin /> : null}
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    current_selected: state.managernav.current_selected
  }
}

export default connect(mapStateToProps)(Guanli);
