import {
  server_url
} from '../';

import common from '../components/common';

export const INIT_INNERMSG = 'innermsg_init';
export const RECEIVED_MSG = 'innermsg_received';
export const SENDED_MSG = 'innermsg_sended';
export const PUSH_SENDED = 'push_sendedmsg';
export const UNREAD_NUM = 'innermsg_unreadnum';
export const SETREADFLG = 'innermsg_setreadflg';

export function innermsg_setreadflg(id,uid,token,dispatch){
  common.ajax({
    url: server_url + "/setinnermsgreadflg.jsp?uid=" + uid + "&token=" + token,
    type: "POST",
    data: {id: id.toString()},
    success:function(status, info, data){}
  });
	dispatch({
		type: SETREADFLG,
		id: id
	});
}

export function innermsg_unreadnum(uid,token,dispatch){
  common.ajax({
    url: server_url + "/unreadinnermsgnum.jsp?uid=" + uid + "&token=" + token,
    type:"GET",
    success:function(status, info, data){
      if(status == 200){
        dispatch({
					type: UNREAD_NUM,
					num: data
				});
      }
    }
  });
}

export function init_innermsg(fromuid,totuid,toname,dispatch){
  dispatch({
    type: INIT_INNERMSG,
    from_uid: fromuid,
    to_uid: totuid,
    to_name: toname,
  });
}

export function innermsg_received(page,pagenum,uid,token,dispatch){
  common.ajax({
    url: server_url + "/receivedinnermsg.jsp",
    type:"GET",
    data:{uid: uid, token: token, p: page.toString(), pnum: pagenum.toString()},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
					type: RECEIVED_MSG,
					list: data
				});
      }
    }
  });
}

export function push_sendedmsg(innermsg,dispatch){
	dispatch({
		type: PUSH_SENDED,
		msg: innermsg
	});
}

export function innermsg_sended(page,pagenum,uid,token,dispatch){
  common.ajax({
    url: server_url + "/sendedinnermsg.jsp",
    type:"GET",
    data:{uid: uid, token: token, p: page.toString(), pnum: pagenum.toString()},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
					type: SENDED_MSG,
					list: data
				});
      }
    }
  });
}

export function send_innermsg(touid,content,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/sendinnermsg.jsp?uid="+uid+"&token="+token,
    type:"POST",
    data:{tuid: touid.toString(), content: content},
    success:function(status, info, data){
      if(status == 200){
        cb();
      }
    }
  });
}
