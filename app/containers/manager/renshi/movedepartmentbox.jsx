'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toast from '../../../components/common/toast';

import {
	gettreestructure
} from '../../../actions/department';

import {
  getemployeelist,
  setemployeedepartment
} from '../../../actions/employee';

class Movedepartment extends Component {
 handleResetdepartment(){
 	const {selected,selected_employee,uid,token,dispatch} = this.props;
   	let departmentid = $.trim($(this.refs.departmentid).val());
   	if(parseInt(departmentid)>0 && departmentid != selected){
	   setemployeedepartment(selected_employee, departmentid, uid, token, dispatch, function(status,info,data){
	   		if(status == 200){
		   		$(this.refs.departmentid).val("");
		   		gettreestructure(uid,token,dispatch);	
				getemployeelist(uid, token, dispatch);
	   		}else{
	   			new Toast({message:info}).show();
	   		}
	   }.bind(this));
   	}
 }
	
 render(){
   return (
	<div className="modal fade" id="movedepartmentModal" tabindex="-1" role="dialog" aria-labelledby="movedepartmentModalLabel" aria-hidden="true">
		<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header">
					<button type="button" className="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<h4 className="modal-title" id="rndepartmentModalLabel">
						设置成员所在部门
					</h4>
				</div>
				<div className="modal-body">
					<form className="form-horizontal" role="form">
						<div className="form-group">
						    <label className="col-sm-4 control-label">部门ID</label>
						    <div className="col-sm-8">
						      <input type="text" className="form-control" ref="departmentid" placeholder="请填写部门名称前面的数字" defaultValue={this.props.selected_name} />
						    </div>
						</div>
					</form>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-default" data-dismiss="modal">关闭
					</button>
					<button onClick={this.handleResetdepartment.bind(this)} type="button" className="btn btn-primary" data-dismiss="modal">
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
    selected_employee: state.employee.selected,
  }
}

export default connect(mapStateToProps)(Movedepartment);