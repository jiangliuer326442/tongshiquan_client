import {
  server_url
} from '../';

import common from '../components/common';

export const SETBIGKINDID = 'manager_setbgkindid';
export const SETSMKINDID = 'manager_setsmkindid';
export const GETSECTIONLIST = 'manager_getsectionlist';

/**
 * 设置文章大分类
 */
export function setbigkindid(kind_id,kind_name){
  return {
    type: SETBIGKINDID,
    current_refid: kind_id,
    current_refname: kind_name
  };
}

/**
 * 设置文章小分类
 */
export function setsmallkindid(small_id){
  return{
    type: SETSMKINDID,
    current_selected: small_id
  };
}

//获取小分类列表
export function getsmallkindlist(kind_id,uid,token,dispatch){
  common.ajax({
    url: server_url + "/post_getsectionlist.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{modelid: kind_id},
    success:function(status, info, data){
      if(status == 200){
		  dispatch({
			  type: GETSECTIONLIST,
			  sectionlist: data
		  });
	  }
    }
  });
}
