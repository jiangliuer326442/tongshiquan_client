import {
  server_url
} from '../';

import common from '../components/common';

export const FRIENDLIST = 'friendlist';
export const SELECTEDFRIEND = 'selectfriend';
export const DELFRIEND = 'delfriend';

export function selectfriend(selecteduid,selecteduname,selectedavatar,uid,token,dispatch){
	dispatch({
		type: SELECTEDFRIEND,
		uid: selecteduid,
		uname: selecteduname,
		avatar: selectedavatar
	});
}

export function delfriend(touid,uid,token,dispatch){
  common.ajax({
    url: server_url + "/delfriend.jsp?uid="+uid+"&token="+token,
    type:"POST",
    data:{touid: touid.toString()},
    success:function(status, info, data){
			if(status == 200){
				dispatch({
					type: DELFRIEND,
					uid: touid
				});
			}
    }
  });
}

export function friendslist(uid,token,dispatch){
  common.ajax({
    url: server_url + "/friendlist.jsp?uid="+uid+"&token="+token,
    type:"POST",
    data:{},
    success:function(status, info, data){
      dispatch({
        type: FRIENDLIST,
        list: data
      });
    }
  });
}
