import {
  server_url
} from '../';

import common from '../components/common';

import {setAvatar} from './login';

export const SHOW = 'bdcompany_show';
export const SETCOMPANY = 'bdcompany_set';
export const GETCOMPANY = 'bdcompany_get';

//设置选中的企业
export function setcompany(companyid){
  return {
    type: SETCOMPANY,
    selected_company: companyid
  }
}

//获取选中企业的列表
export function getcompanylist(companyname,dispatch,cb){
  common.ajax({
    url: server_url+"/company_search.jsp?",
    type: "POST",    
    data: {name: companyname}, 
    success: function (status, info, data) {
      cb(status,info,data);
      if(status == 200){
        dispatch({
          type: GETCOMPANY,
          companyList: data,
          selected_company: data.length == 1 ? data[0].KeyNo: ""
        });
      }
    }
  });
}

//接收登陆消息
export function show_bdcompany(uid,token,dispatch){
  //获取相关数据
  common.ajax({
    url: server_url+"/getbytoken.jsp",              //请求地址
    type: "GET",                       //请求方式
    data: { token:token, uid:uid },        //请求参数
    success: function (status, info, data) {
      if(status == 200){
        dispatch(setAvatar(data.avatar2));
        dispatch({
          type: SHOW,
          bindcompany_flg: false
        });
      }
    }
  });
}
