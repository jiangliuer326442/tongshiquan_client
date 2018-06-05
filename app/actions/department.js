import React from 'react';

import {
  server_url
} from '../';

import common from '../components/common';

export const GETDEPARTMENT = 'department_get';
export const SETDEPARTMENT = 'department_set';
export const GETDEPARTMENTEMPLOYEE = 'departmentemployee_get';
export const GETTREESTRUCTURE = 'department_gettree';
export const SETSELECTED = 'department_setselected';
export const DELDEPARTMENT = 'department_deldepartment';
export const RENAMEDEPARTMENT = 'department_rndepartment';

//部门名称重命名
export function rndepartment(departmentid,departmentname,uid,token,dispatch,cb){
  common.ajax({
    url: server_url+"/company_renamestructure.jsp?uid=" + uid + "&token=" + token,              //请求地址
    type: "POST",                       //请求方式
		data: {id: departmentid.toString(),name: departmentname},
    success: function (status, info, data) {
			if(status == 200){
				cb();
				dispatch({
					type: RENAMEDEPARTMENT,
					name: departmentname
				});
			}
    }
  });
}

//删除部门
export function deldepartment(departmentid,uid,token,dispatch,cb){
  common.ajax({
    url: server_url+"/company_delstructure.jsp?uid=" + uid + "&token=" + token,              //请求地址
    type: "POST",                       //请求方式
		data: {departmentid: departmentid.toString()},
    success: function (status, info, data) {
      cb(status, info, data);
			if(status == 200){
				dispatch({
					type: DELDEPARTMENT,
					list: data
				});
			}
    }
  });
}

//设置选中的部门
export function setselecteddepartment(departmentid,departmentname,departmentmnum,dispatch){
	dispatch({
		type: SETSELECTED,
		id: departmentid,
		name: departmentname,
		num: departmentmnum
	});
}

//获取树状组织架构
export function gettreestructure(uid,token,dispatch){
  common.ajax({
    url: server_url+"/company_gettreestructure.jsp?uid=" + uid + "&token=" + token,              //请求地址
    type: "POST",                       //请求方式
		data: {},
    success: function (status, info, data) {
			if(status == 200){
				dispatch({
					type: GETTREESTRUCTURE,
					list: data
				});
			}
    }
  });
}

//获取部门下子部门和员工列表
export function getdepartmentemployee(superid,uid,token,dispatch){
  common.ajax({
    url: server_url+"/company_getstructureemployee.jsp?uid=" + uid + "&token=" + token,              //请求地址
    type: "POST",                       //请求方式
		data: {superid: superid.toString()},
    success: function (status, info, data) {
      if(status == 200){
        dispatch({
					type: GETDEPARTMENTEMPLOYEE,
					employee: data.employee,
					structure: data.structure,
					selected: superid
				});
      }
    }
  });
}

//设置组织架构信息
export function setdepartment(department_name, superid, uid,token,dispatch, cb){
  common.ajax({
    url: server_url + "/company_addstructure.jsp?uid=" +uid + "&token=" + token,
    type:"POST",
    data:{name: department_name, superid: superid.toString()},
    success:function(status, info, data){
      cb(status);
    }
  });
}

//获取职员信息
export function getdepartment(uid,token,dispatch){
  common.ajax({
    url: server_url+"/company_getstructure.jsp?uid=" + uid + "&token=" + token,              //请求地址
    type: "POST",                       //请求方式
    success: function (status, info, data) {
      if(status == 200){
        let struct_arr = [];
        jQuery.each(data, function (n, value) {
          struct_arr.push(<option value={value.id} key={value.id}>{value.groupname}</option>);
        });
        dispatch({
          type: GETDEPARTMENT,
          struct_arr: struct_arr
        });
      }
    }
  });
}
