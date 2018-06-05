'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

require('./less/index.less');

import common from '../../../components/common';
import Toast from '../../../components/common/toast';
import Adddepartment from './adddepartmentbox';
import Rndepartment from './renamedepartmentbox';
import Movedepartment from './movedepartmentbox';
import Addemployee from './addemployee.jsx';

import {
	gettreestructure,
	setselecteddepartment,
	getdepartmentemployee,
	deldepartment,
} from '../../../actions/department';
import {
  getemployeelist,
  employee_select,
  employee_multiselect,
  delemployee
} from '../../../actions/employee';
import {
  setsmallkindid
} from '../../../actions/manager';

class Renshi extends Component {
	constructor(props){
		super(props);
		this.state={
			'selectall_flg': false,
		};
	}
	
	//删除员工
	handelDelemployee(){
		const {selected_employee,uid,token,dispatch} = this.props;
	   delemployee(selected_employee, uid, token, dispatch, function(status,info,data){
	   		if(status == 200){
		   		gettreestructure(uid,token,dispatch);	
				getemployeelist(uid, token, dispatch);
	   		}else{
	   			new Toast({message:info}).show();
	   		}
	   }.bind(this));
	}
	
	//删除部门
	handelDeldepartment(){
		const {selected,uid,token,dispatch} = this.props;
		deldepartment(selected,uid,token,dispatch,function(status, info, data){
			if(status == 200){
				gettreestructure(uid,token,dispatch);	
				getemployeelist(uid, token, dispatch);
			}else{
				new Toast({message:info}).show();
			}
		}.bind(this));
	}
	
	selectdepartment(departmentid,departmentname,departmentmnum){
		const {uid,token,dispatch} = this.props;
		setselecteddepartment(departmentid,departmentname,departmentmnum,dispatch);
		getdepartmentemployee(departmentid,uid,token,dispatch);
	}
	
	componentDidMount(){
		const {uid,token,dispatch} = this.props;
		gettreestructure(uid,token,dispatch);	
		getemployeelist(uid, token, dispatch);
	}
	
  //设置当前选中的状态
	setcurrent(event){
		if(event.target.getAttribute('data-id') != this.props.current_selected){
			this.props.dispatch(setsmallkindid(event.target.getAttribute('data-id')));
		}
	}
	
	//显示员工详情页
	toDetail(eid,event){
		let target = $(event.target).parents(".employee");
		employee_select(eid,this.props.dispatch);
		target.addClass("flip");
	    setTimeout(function(){
	        target.removeClass('flip');
			this.props.dispatch(setsmallkindid(5))
	    }.bind(this), 1000);
	}
	
	renderemployee(eid,uid,departmentid,name,mail,phone,groupname){
		return (
			<li className="employee">
				<input onClick={this.pushselect.bind(this,eid)} className="user-select" type="checkbox" value={uid} checked={$.inArray(eid, this.props.selected_employee)>=0 ? true:false} />:
				<i className="clubfriends icon--yonghu"></i>
				<span className="username" onClick={this.toDetail.bind(this,eid)}>{name}</span>
				<span className="mail">{mail}</span>
				<span className="phone">{phone}</span>
				<span className="groupname">{groupname}</span>
			</li>
		);
	}
	
	//处理选择/反选事件
	pushselect(uid){
		let employee_arr = this.getemployeearr();
		let selected_employee = this.props.selected_employee;
		if($.inArray(uid,selected_employee )>=0){
			//已经存在该元素，就删除
			selected_employee.splice($.inArray(uid,selected_employee),1);
		}else{
			selected_employee.push(uid);
		}
		if(selected_employee.length>=employee_arr.length){
			this.setState({selectall_flg:true});
		}else{
			this.setState({selectall_flg:false});
		}
		employee_multiselect(selected_employee,this.props.dispatch);
	}
	
	//获取员工列表
	getemployeearr(){
		let employee_arr;
		//获取员工数组
		if(this.props.selected>0){
			employee_arr = this.props.employee_arr;
		}else{
			employee_arr = this.props.employee_list;
		}
		return employee_arr;
	}
	
	//处理全选/反选事件
	selectall(){
		//选择的数据列表
		let selected_arr = [];
		let employee_arr = this.getemployeearr();
		let selectall_flg = true;
		//判断是全选还是反选
		if(this.props.selected_employee.length >= employee_arr.length){
			selectall_flg = false;
		}
		this.setState({selectall_flg:selectall_flg});
		if(selectall_flg){
			for(let i=0; i<employee_arr.length; i++){
				selected_arr.push(employee_arr[i].id);
			}
		}
		employee_multiselect(selected_arr,this.props.dispatch);
	}
	
	render(){
		return (
	<div style={{display:"flex",flex:"1"}}>
		<div className="department">
		    <div className="department-item" data-toggle="collapse" data-target="#department0" onClick={this.selectdepartment.bind(this,0,"",0)}>
		    	<i className="clubfriends icon--xiasanjiao-copy"></i>
		    	<i className="clubfriends icon--wenjianjia"></i>
		    	{common.trim(this.props.companyname,16,true)}
		    </div>
		    <div id="department0" className="collapse in level0">
{
	this.props.list.map((item,index)=>{
		return (
			<div>
			    <div className={"department-item"+(item.id==this.props.selected?" selected":"")} data-toggle="collapse" data-target={"#department"+item.id} onClick={this.selectdepartment.bind(this,item.id,item.groupname,item.membernum)}>
{
	item.list.length>0?
	(
		item.id==this.props.selected?
					<i className="clubfriends icon--xiasanjiao-copy"></i>
		:
					<i className="clubfriends icon--right-triangle"></i>
	)
	:
					<span style={{display:"inline-block",width:"7px"}} />
}
			    	<i className="clubfriends icon--wenjianjia"></i>
			    	{item.id+"_"+common.trim(item.groupname,20,true)}
			    </div>
{
	item.list.length > 0 ?
			    <div id={"department"+item.id} className={"collapse level"+item.level}>
{
	item.list.map((item2,indes2)=>{
		return (
				<div>
				    <div className={"department-item"+(item2.id==this.props.selected?" selected":"")} data-toggle="collapse" data-target={"#department"+item2.id} onClick={this.selectdepartment.bind(this,item2.id,item2.groupname,item2.membernum)}>
{
	item2.list.length>0?
	(
		item2.id==this.props.selected?
						<i className="clubfriends icon--xiasanjiao-copy"></i>
		:
						<i className="clubfriends icon--right-triangle"></i>
	)
	:
						<span style={{display:"inline-block",width:"7px"}} />
}
				    	<i className="clubfriends icon--wenjianjia"></i>
				    	{item2.id+"_"+common.trim(item2.groupname,20,true)}
				    </div>
{
	item2.list.length > 0 ?
			    	<div id={"department"+item2.id} className={"collapse level"+item2.level}>
{
	item2.list.map((item3,indes3)=>{
		return (
			<div className={"department-item"+(item3.id==this.props.selected?" selected":"")} onClick={this.selectdepartment.bind(this,item3.id,item3.groupname,item3.membernum)}>
				<span style={{display:"inline-block",width:"7px"}} />
				<i className="clubfriends icon--wenjianjia"></i>
				{item3.id+"_"+common.trim(item3.groupname,20,true)}
			</div>
		)
	})
}
					</div>
	:null
}
				</div>
		);
	})
}
				</div>
	:null
}
			</div>
		);
	})
}
			</div>
		</div>
		{this.props.current_selected == 3 ? 
			<Addemployee method="create" />
			:
			this.props.current_selected == 5 ?
			<Addemployee method="edit" current={this.props.current_employee} />
			:
		<div className="department_body">
			<div className="header">
			    <h1>{this.props.selected_name?this.props.selected+"_"+this.props.selected_name:this.props.companyname}</h1>
				<div className="department_operator">
				{this.props.selected>0?
					<Link data-toggle="modal" data-target="#rndepartmentModal">修改名字</Link>
				:null}
					<Link data-toggle="modal" data-target="#adddepartmentModal">新建子部门</Link>
				{this.props.selected>0 && this.props.selected_mnum==0?
					<Link onClick={this.handelDeldepartment.bind(this)}>删除</Link>
				:null}
				</div>
				<div className="department_mnum">成员
					{this.props.selected==0?this.props.employee_list.length:this.props.selected_mnum}
					个</div>
			</div>
			<ul className="employees">
				<li className="employee">
				{this.state.selectall_flg?
					<input className="user-select" type="checkbox" value="0" onClick={this.selectall.bind(this)} checked="checked" />
					:
					<input className="user-select" type="checkbox" value="0" onClick={this.selectall.bind(this)} />
				}
				{this.props.selected>0?
					<button type="button" className="btn btn-default" data-id="3" onClick={this.setcurrent.bind(this)}>新增成员</button>
				:null}
					{this.props.selected_employee.length>0?<button type="button" className="btn btn-default" data-toggle="modal" data-target="#movedepartmentModal">设置所在部门</button>:null}
					{this.props.selected_employee.length>0?<button type="button" className="btn btn-default" onClick={this.handelDelemployee.bind(this)}>删除</button>:null}
				</li>
{
	this.props.selected>0?
	this.props.employee_arr.map((employee,index)=>{
		return this.renderemployee(employee.id,employee.userid,this.props.selected,employee.user_name,employee.user_mail,employee.user_phone,this.props.selected_name);
	})
	:
	this.props.employee_list.map((employee,index)=>{
		return this.renderemployee(employee.id,employee.userid,employee.structerid,employee.user_name,employee.user_mail,employee.user_phone,employee.groupname);
	})
}
			</ul>
		</div>
		}
		<Adddepartment />
		<Rndepartment />
		<Movedepartment />
	</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
  	companyname: state.company.companyname,
  	list: state.department.struct_trre,
  	selected: state.department.selected_department,
  	selected_name: state.department.selected_departmentname,
  	selected_mnum: state.department.selected_departmentmnum,
  	employee_arr: state.department.employee_arr,
  	employee_list: state.employee.list,
  	selected_employee: state.employee.selected,
  	fresh_flg: state.employee.fresh_flg,
  	current_selected: state.managernav.current_selected,
  	current_employee: state.employee.current,
  }
}

export default connect(mapStateToProps)(Renshi);