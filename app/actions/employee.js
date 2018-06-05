import React from 'react';

import {
  server_url
} from '../';

import common from '../components/common';

export const GETEMPLOYEE = 'employee_get';
export const ADDEMPLOYEE = 'employee_add';
export const EDITEMPLOYEE = 'employee_edit';
export const SETCURRENT = 'employee_select';
export const SETMULTICURRENT = 'employee_multiselect';
export const SETEMPLOYEEDP = 'employee_setdepartment';

export function delemployee(userlist,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/company_delemployee.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{userlist: userlist.join(',')},
    success:function(status, info, data){
      cb(status,info,data);
    }
  });
}

export function setemployeedepartment(userlist,departmentid,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/company_setemployeedp.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{userlist: userlist.join(','), departmentid: departmentid.toString()},
    success:function(status, info, data){
      cb(status,info,data);
      dispatch({
      	type: SETEMPLOYEEDP
      });
    }
  });
}

export function employee_multiselect(user_arr,dispatch){
	dispatch({
		type: SETMULTICURRENT,
		user_arr: user_arr
	});
}

export function employee_select(employeeid,dispatch){
	dispatch({
		type: SETCURRENT,
		employeeid: employeeid
	});
}

export function editemployee(userid,avatar,user_name,user_nick,user_mail,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/company_modifyemployee.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{userid: userid.toString(), user_avatar: avatar, user_name: user_name, user_nick: user_nick, user_mail: user_mail},
    success:function(status, info, data){
      cb(status,data);
      getemployeelist(uid,token,dispatch)
    }
  });
}

export function addemployee(avatar,structerid,user_phone,user_name,user_nick,user_mail,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/company_addemployee.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{avatar: avatar, structerid: structerid.toString(), user_phone: user_phone, user_name: user_name, user_nick: user_nick, user_mail: user_mail},
    success:function(status, info, data){
      cb(status);
      getemployeelist(uid,token,dispatch)
    }
  });
}

export function getemployeelist(uid,token,dispatch){
  //获取全局设置信息
  common.ajax({
    url: server_url+"/company_epllist.jsp?uid=" + uid + "&token=" + token,              //请求地址
    type: "POST",                       //请求方式
    success: function (status, info, data) {
      if(status == 200){
        let employee_list = [];
        jQuery.each(data, function (n, value) {
          employee_list.push(value);
        });
        dispatch({
          type: GETEMPLOYEE,
          employee_list
        });
      }
    }
  });
}
