import {
  server_url,history
} from '../';

import common from '../components/common';

export const NAV1 = 'chat_lasttalk';
export const NAV2 = 'chat_friends';
export const NAV3 = 'chat_structor';
export const SETNAV = 'chat_setnav';
export const PUSHCHAT = 'chat_push';
export const GETRECENTCHAT = 'chat_getrecent';
export const GETCHATLOG = 'chat_getlog';
export const ADDCHAT = 'chat_add';
export const GETCHATMSG = 'chat_newmsg';

//上传聊天文件
export function pushchatfile(file,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/addchatfile.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{file: file},
    success:function(status, info, data){
      if(status == 200){
				cb(data);
      }
    }
  });
}

//获取新消息
export function getchatmsg(from_uid,content,content_type,uid,token,dispatch){
  common.ajax({
    url: server_url + "/getchatuserinfo.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{touid: from_uid.toString()},
    success:function(status, info, data){
      if(status == 200){
				dispatch({
					type: GETCHATMSG,
					content: content,
					content_type: content_type,
					fuid: from_uid,
					tuid: uid,
					username: data.friend_name,
					avatar: data.user_avatar
				});
      }
    }
  });
}

//添加聊天
export function addchat(touid,content,content_type,uid,token,dispatch){
  common.ajax({
    url: server_url + "/addchat.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{touid: touid.toString(), content: content, content_type: content_type},
    success:function(status, info, data){
      if(status == 200){
				dispatch({
					type: ADDCHAT,
					tuid: touid,
					fuid: uid,
					content: content,
					content_type: content_type
				});
      }
    }
  });
}

//获取聊天记录
export function getchatlog(tuid,page,pagenum,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/getchatlog.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{touid: tuid.toString(), p: page.toString(), pnum: pagenum.toString()},
    success:function(status, info, data){
      if(status == 200){
        cb();
				dispatch({
					type: GETCHATLOG,
					list: data,
					uid: tuid
				});
      }
    }
  });
}

//获取最近的聊天列表
export function getrecentchat(page,pagenum,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/getrecentchater.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{p: page.toString(), pnum: pagenum.toString()},
    success:function(status, info, data){
      if(status == 200){
        cb();
				dispatch({
					type: GETRECENTCHAT,
					list: data
				});
      }
    }
  });
}

//设置导航
export function setnav(nav,dispatch){
	dispatch({
		type: SETNAV,
		nav: nav
	});
}

//发起聊天
export function pushchat(touid,dispatch){
	dispatch({
		type: PUSHCHAT,
		uid: touid
	});
	dispatch({
		type: SETNAV,
		nav: NAV1
	});
}