import {
  server_url
} from '../';

import common from '../components/common';

export const GET_COMPANY_INFO = 'getcpyinfo';
export const GETMYCOMPANYINFO = 'getmycompanyinfo';
export const GET_EMPLOYEE_INFO = 'getemployee';
export const GET_SBEMPLOYEE_INFO = 'getsbemployee';
export const GETGLBSETTING = 'getglbsetting';
export const SETGLBSETTING = 'setglbsetting';

//设置全局设置信息
export function setglbsetting(logo,allow_visit_time,is_allowregister,is_allowvisit,is_postbar_audit,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/company_setcfginfo.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{logo: logo ,allow_visit_time: allow_visit_time, is_allowregister: is_allowregister, is_allowvisit: is_allowvisit, is_postbar_audit: is_postbar_audit},
    success:function(status, info, data){
      cb();
      dispatch({
        type: SETGLBSETTING,
        allow_visit_time: allow_visit_time,
        is_allow_register: is_allowregister,
        is_postbar_audit: is_postbar_audit,
        is_allowvisit: is_allowvisit,
        logo: data
      });
    }
  });
}

//获取全局设置信息
export function getglbsetting(uid,token,dispatch){
  //获取全局设置信息
  common.ajax({
    url: server_url+"/company_getcfginfo.jsp?uid=" + uid + "&token=" + token,
    type: "POST",                       //请求方式
    success: function (status, info, data) {
      dispatch({
        type: GETGLBSETTING,
        allow_visit_time: data.allow_visit_time,
        is_allow_register: data.is_allow_register,
        is_postbar_audit: data.is_postbar_audit,
        is_allowvisit: data.is_allowvisit,
        logo: data.logo
      });
    }
  });
}

//获取指定员工信息
export function getsbemployeeinfo(tuid,uid,token,dispatch,cb){
  common.ajax({
    url: server_url+"/company_getsbuserinfo.jsp?uid=" + uid + "&token=" + token,
    type: "POST",                       //请求方式
		data: {touid: tuid.toString()},
    success: function (status, info, data) {
      if(status == 200){
				cb(data);
				dispatch({
					type: GET_SBEMPLOYEE_INFO
				});
      }
    }
  });
}

//获取职员信息
export function getemployeeinfo(uid,token,dispatch,cb){
  //加载模块列表
  common.ajax({
    url: server_url+"/company_getuserinfo.jsp?uid=" + uid + "&token=" + token,
    type: "POST",                       //请求方式
    success: function (status, info, data) {
      if(status == 200){
				cb(data.companyid);
        dispatch({
          type: GET_EMPLOYEE_INFO,
          companyid: data.companyid,
          is_admin: data.is_admin,
          models: data.models,
          avatar: data.avatar,
          uname: data.uname,
          umail: data.umail,
          unick: data.unick,
          uphone: data.uphone
        });
      }
    }
  });
}

//获取我的企业信息
export function getmycompanyinfo(uid,token,dispatch,cb){
  common.ajax({
    url: server_url+"/company_getmyinfo.jsp?uid=" + uid + "&token=" + token,              //请求地址
    type: "POST",                       //请求方式
    data:{},
    success: function (status, info, data) {
      if(status == 200){
        dispatch({
          type: GETMYCOMPANYINFO,
          name: data.Name,
          no: data.No,
          opername: data.OperName,
          startdate: data.StartDate,
          logo: data.logo
        });
      }
      cb(status,info,data);
    }
  });
}

//接收登陆消息
export function getcpyinfo(companyid,uid,token,dispatch,cb){
  //验证用户登录状态
  //确认用户访问权限
  //获取企业内容
  common.ajax({
    url: server_url+"/company_getname.jsp?uid=" + uid + "&token=" + token,              //请求地址
    type: "POST",                       //请求方式
    data:{companyid: companyid},
    success: function (status, info, data) {
      if(status == 200){
        dispatch({
          type: GET_COMPANY_INFO,
          name: data.Name,
		      logo: data.logo
        });
      }
      cb(status,info,data);
    }
  });
}
