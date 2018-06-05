'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	gettreestructure,
  setdepartment,
} from '../../../actions/department';

import {
  getemployeelist,
} from '../../../actions/employee';

class Adddepartment extends Component {
 handleAdddepartment(){
 	const {selected,uid,token,dispatch} = this.props;
   	let departmentname = $.trim($(this.refs.departmentname).val());
   	if(departmentname != "" && departmentname.length <= 20){
	   setdepartment(departmentname, selected, uid, token, dispatch, function(status){
	   	if(status == 200){ 
	   		$(this.refs.departmentname).val("");
	   		gettreestructure(uid,token,dispatch);	
				getemployeelist(uid, token, dispatch);
	   	}
	   }.bind(this));
   	}
 }
	
 render(){
   return (
	<div className="modal fade" id="adddepartmentModal" tabindex="-1" role="dialog" aria-labelledby="adddepartmentModalLabel" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header">
					<button type="button" className="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<h4 className="modal-title" id="adddepartmentModalLabel">
						新建子部门
					</h4>
				</div>
				<div className="modal-body">
					<form className="form-horizontal" role="form">
						<div className="form-group">
						    <label className="col-sm-4 control-label">部门名称</label>
						    <div className="col-sm-8">
						      <input type="text" className="form-control" ref="departmentname" placeholder="请输入部门名称" />
						    </div>
						</div>
					</form>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button onClick={this.handleAdddepartment.bind(this)} type="button" className="btn btn-primary" data-dismiss="modal">
						确定
					</button>
				</div>
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
    selected: state.department.selected_department,
  }
}

export default connect(mapStateToProps)(Adddepartment);