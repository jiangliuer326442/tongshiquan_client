'use strict';

/**
 * 公司架构
 */

require('./less/company.less');

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	getdepartmentemployee
} from '../../actions/department';

import {
	selectfriend
} from '../../actions/friendslist';

class Company extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			lastselected: []
		};
	}
	
	componentDidMount(){
		const {selected_department,uid,token,dispatch} = this.props;
		getdepartmentemployee(selected_department,uid,token,dispatch);
	}
	
	handleGroup(group_id){
		const {uid,token,dispatch} = this.props;
		this.state.lastselected.push(this.props.selected_department);
		getdepartmentemployee(group_id,uid,token,dispatch);
	}
	
	handlePre(){
		const {uid,token,dispatch} = this.props;
		getdepartmentemployee(this.state.lastselected.pop(),uid,token,dispatch);
		this.setState({
			lastselected: this.state.lastselected
		});
	}
	
	handleSelectemployee(touid,touname,toavatar){
		const {uid,token,dispatch} = this.props;
		selectfriend(touid,touname,toavatar,uid,token,dispatch);
	}

  render(){
    return (
			<div>
			{this.props.selected_department>0?
				<span className="return_btn" onClick={this.handlePre.bind(this)}>返回上级 &lt;</span>
			:null}
{this.props.struct.length>0 ?
				<ul className="structure-list list-group">
{
	this.props.struct.map((item, index) => {
		return (
						<li key={item.id} onClick={this.handleGroup.bind(this,item.id)} className="list-group-item">
								<span className="pull-right">&gt;</span>
								<span className="pull-right">{item.membernum}</span>
									{item.groupname}
						</li>
		)
	})
}
				</ul>
:null}
{
	this.props.employee.length>0?
					<ul className="userlist">
	{
		this.props.employee.map((item, index) => {
			if(item.userid){
				return (
							<li key={item.userid} onClick={this.handleSelectemployee.bind(this,item.userid,item.user_name,item.user_avatar)} className={(item.userid==this.props.selected?"current":"")+" useritem"}>
								<img src={item.user_avatar} className="avatar" />
								<span className="username">{item.user_name}</span>
							</li>
				)
			}
		})
	}
					</ul>
	: null
}
			</div>
		)
  }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
		token: state.login.token,
		selected_department: state.department.selected_department,
		struct : state.department.struct_arr,
		employee : state.department.employee_arr,
		selected: state.chat.selectedfrienduid,
  }
}

export default connect(mapStateToProps)(Company);
