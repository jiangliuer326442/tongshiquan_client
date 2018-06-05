import {
  server_url
} from '../';

import common from '../components/common';

export const SETMANAGER = 'setmanger';

/**
 * 设置超级管理员
 */
export function setmanger(manager_id, uid, token, dispatch, cb){
  common.ajax({
    url: server_url + "/setsmanager.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{manager_id: manager_id},
    success:function(status, info, data){
      if(status == 200){
  		  dispatch({
  			  type: SETMANAGER
  		  });
        cb();
	    }
    }
  });
}
