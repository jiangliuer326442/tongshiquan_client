import {
  server_url,
  history
} from '../';
import common from '../components/common';

export const CM_UNBIND = 'company_unbind';
export const SENDREGCODE = 'sendregcode';
export const SENDLOGCODE = 'sendlogcode';
export const CM_BIND = 'company_bind';

/**
 * 绑定企业
 */
export function company_bind(uid,token,companyid,phone,codes,dispatch,cb){
  common.ajax({
    url: server_url + "/company_adduser.jsp?uid="+uid+"&token="+token+"&uuid=",
    type:"POST",
    data:{companyid:companyid,phone:phone,codes:codes},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: CM_BIND
        });
      }
      cb(status,info,data);
    }
  });
}

/**
 * 发送注册短信
 */
export function sendregcode(uid,token,phone,dispatch,cb){
  common.ajax({
    url:server_url + "/sendregcode.jsp?uid="+uid+"&token="+token,
    type:"POST",
    data:{phone:phone},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: SENDREGCODE
        });
      }
      cb(status,info);
    }
  });
}

/**
 * 发送登录短信
 */
export function sendlogcode(phone,dispatch,cb){
  common.ajax({
    url:server_url + "/sendlogcode.jsp?",
    type:"POST",
    data:{phone:phone},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: SENDLOGCODE
        });
      }
      cb(status,info);
    }
  });
}

//手机哈注册
export function send_register(companyid,phone,codes,dispatch,cb){
  common.ajax({
    url: server_url + "/registerbyphone.jsp?",
    type:"POST",
    data:{companyid: companyid, phone: phone, codes: codes},
    success:function(status, info, data){
    	if(status == 200){
        dispatch({
          type: CM_BIND
        });
    	}
    	cb(status,info,data);
    }
  });
}

//解绑企业
export function company_unbind(uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/company_unbind.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{},
    success:function(status, info, data){
      if(status == 200){
				dispatch({
					type: CM_UNBIND
				})
			}
			cb(status);
    }
  });
}
