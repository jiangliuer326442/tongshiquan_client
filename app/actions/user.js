import {
  server_url
} from '../';

import common from '../components/common';

/*
 * 获取当前用户的信息类
*/

export const CM_GMYPHONE = 'company_getmyphone';
export const SETMYAVATAR = 'company_setmyavatar';
export const SETMYNICK = 'company_setmynick';
export const MARKUSER = 'markuser';
export const BINDFLG = 'user_loginbind';

//获取账户绑定信息
export function getbindflg(uid,token,dispatch){
  common.ajax({
    url: server_url + "/getuserbind.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{},
    success:function(status, info, data){
      if(status == 200){
				dispatch({
					type: BINDFLG,
					qq_flg: data.qq_flg,
					wx_flg: data.wx_flg,
					dd_flg: data.dd_flg,
				});
			}
    }
  });
}

//备注其他用户
export function markuser(touid,markname,uid,token,dispatch){
  common.ajax({
    url: server_url + "/markuser.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{touid: touid.toString(), mname: markname},
    success:function(status, info, data){
      if(status == 200){
				dispatch({
					type: MARKUSER,
					touid: touid,
					markname: markname,
				});
			}
    }
  });
}

//设置我的昵称
export function company_setmynick(uid,token,nick,dispatch){
  common.ajax({
    url: server_url + "/setmycompanynick.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{nick: nick},
    success:function(status, info, data){
      if(status == 200){
				dispatch({
					type: SETMYNICK,
					nick: nick
				});
			}
    }
  });
}

//设置我的头像
export function company_setmyavatar(uid,token,avatar,dispatch,cb){
  common.ajax({
    url: server_url + "/setmycompanyavatar.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{avatar: avatar},
    success:function(status, info, data){
      if(status == 200){
				dispatch({
					type: SETMYAVATAR,
					avatar: data
				});
				cb(data);
			}
    }
  });
}

//获取当前用户的手机号
export function company_getmyphone(uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/getmyphone.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{},
    success:function(status, info, data){
      if(status == 200){
				dispatch({
					type: CM_GMYPHONE,
					phone: data
				});
				cb(data);
			}
    }
  });
}
