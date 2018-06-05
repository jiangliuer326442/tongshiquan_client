'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../../components/manager/header';

import {
  getemployeelist,
	employee_select
} from '../../../actions/employee';
import {
  setsmallkindid
} from '../../../actions/manager';

class Listemployee extends Component {
  componentDidMount(){
    if(this.props.employee_list.length == 0){
      getemployeelist(this.props.uid, this.props.token, this.props.dispatch);
    }
  }
	
	//显示员工详情页
	toDetail(userid,event){
		let target = $(event.target).parents(".employee");
		employee_select(userid,this.props.dispatch);
		target.addClass("flip");
    setTimeout(function(){
        target.removeClass('flip');
				this.props.dispatch(setsmallkindid(5))
    }.bind(this), 1000);
	}

  //渲染员工详情
	renderEmployee(employee_info){
		return (
			<div className="employee animated" onClick={this.toDetail.bind(this,employee_info.userid)} key={employee_info.user_phone}>
				<div className="avatar">
					{typeof employee_info.user_avatar != "undefined" ?
					<img className={(typeof employee_info.userid == "undefined" ? " die-emp":"")} src={employee_info.user_avatar} />:
					<img className={(typeof employee_info.userid == "undefined" ? " die-emp":"")} src={require('../img/avatar.jpg')} />}
				</div>
				<div className="info">
					<div className="row">
						<div className="user_name">{employee_info.user_name}</div>
						(<div className="user_nick">{employee_info.user_nick}</div>)
					</div>
					<div className="row">
						<div className="user_group">{employee_info.groupname}</div>
					</div>
					<div className="row">
						<div className="user_phone">{employee_info.user_phone}</div>
					</div>
					<div className="row">
						<div className="user_mail">{employee_info.user_mail}</div>
					</div>
				</div>
			</div>
		);
	}
	 render(){
		return (
		<div style={{height: "100%", backgroundColor:"#fff"}}>
			<div style={{display:"flex",flexDirection:"column",height: "100%",padding:"22px 27px",border:"1px solid #ccc",width:"800px",borderRightWidth:"0px"}}>
        <Header title="员工列表" />
        <div className="employee_list">
					{
            this.props.employee_list.map((item, index) => this.renderEmployee(item))
          }
				</div>
			</div>
		</div>
		);
	 }
}


function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
    employee_list: state.employee.list
  }
}

export default connect(mapStateToProps)(Listemployee);
