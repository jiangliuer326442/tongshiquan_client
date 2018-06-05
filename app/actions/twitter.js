import {
  server_url,history
} from '../';

import common from '../components/common';

export const ADD_TWITTER = 'twitter_add';
export const LIST_TWITTER = 'twitter_list';
export const LSUSER_TWITTER = 'twitter_userls';
export const TOGGLEUSER_TIWTTER = 'twitter_toggleuser';
export const HIDE_TWITTER = 'twitter_hide';
export const HIDEUSER_TWITTER = 'twitter_hduserls';
export const DELHDUSER_TWITTER = 'twitter_delhiduser';
export const SETTWITTER_ZAN = 'twitter_addzan';
export const SETTWITTER_UNZAN = 'twitter_addunzan';
export const ADDCOMMENT_TWITTER = 'twitter_addcomment';
export const ADDREPLY_TWITTER = 'twitter_addreply';
export const GETVISIBLE_TWTTTER = 'twitter_getvisible';

export function addreply(twtindex, twtid, content, avatar, uname, cmtid, uid, token, dispatch, cb){
  common.ajax({
    url: server_url + "/twtreplycomment.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{twtid: twtid.toString(), cmtid: cmtid.toString(), content: content},
    success:function(status, info, data){
      if(status == 200){
        cb();
        dispatch({
          type: ADDREPLY_TWITTER,
          index: twtindex,
          avatar: avatar,
          nick: uname,
          uid: uid,
          content: content,
          uperid: cmtid,
        });
      }
    }
  });
}

export function addcomment(twtindex, twtid, content, avatar, uname, uid, token, dispatch, cb){
  common.ajax({
    url: server_url + "/twtaddcomment.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{twtid: twtid.toString(), content: content},
    success:function(status, info, data){
      if(status == 200){
        cb();
        dispatch({
          type: ADDCOMMENT_TWITTER,
          index: twtindex,
          avatar: avatar,
          nick: uname,
          uid: uid,
          content: content,
        });
      }
    }
  });
}

export function gettwtvisible(uid,token,dispatch){
  common.ajax({
    url: server_url + "/gettwtvisible.jsp?uid="+uid+"&token="+token,
    type:"GET",
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: GETVISIBLE_TWTTTER,
          data
        });
      }
    }
  });
}

/**
 * 删除我产生的屏蔽我的用户
 */
 export function delmydeluser(user_id, uid, token, cb){
  common.ajax({
    url: server_url + "/twtdelmyhideuser.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{fuid: user_id.toString()},
    success:function(status, info, data){
      cb(status);
    }
  });
 }

/**
 * 重新关注屏蔽掉的用户
 */
export function deldeluser(user_index, user_id, uid, token, dispatch, cb){
  common.ajax({
    url: server_url + "/twtdelhideuser.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{tuid: user_id.toString()},
    success:function(status, info, data){
      if(status == 200){
        cb();
        dispatch({
          type: DELHDUSER_TWITTER,
          index: user_index,
        });
      }
    }
  });
}

/**
 * 获取屏蔽的用户列表
 */
export function deluserls(uid, token, dispatch){
  common.ajax({
    url: server_url + "/twthideuserls.jsp?uid=" + uid + "&token=" + token,
    type:"GET",
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: HIDEUSER_TWITTER,
          list: data,
        });
      }
    }
  });
}

export function twitter_addunzan(twtindex, twtid, uid, token, dispatch){
  common.ajax({
    url: server_url + "/twtdelzan.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{twtid: twtid.toString()},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: SETTWITTER_UNZAN,
          index: twtindex
        })
      }
    }
  });
}

export function twitter_addzan(twtindex, twtid, uid, token, dispatch){
  common.ajax({
    url: server_url + "/twtaddzan.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{twtid: twtid.toString()},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: SETTWITTER_ZAN,
          index: twtindex
        })
      }
    }
  });
}

export function delemptwt(twtindex, twtid, uid, token, dispatch, cb){
  common.ajax({
    url: server_url + "/delemptwt.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{twtid: twtid.toString()},
    success:function(status, info, data){
      if(status == 200){
        cb();
        dispatch({
          type: HIDE_TWITTER,
          index: twtindex
        });
      }
    }
  }); 
}

export function deltwt(twtindex, twtid, uid, token, dispatch){
  common.ajax({
    url: server_url + "/delmytwt.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{twtid: twtid.toString()},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: HIDE_TWITTER,
          index: twtindex
        });
      }
    }
  });
}

//隐藏某个推特
export function hidetwt(twtindex, twtid, uid, token, dispatch){
  common.ajax({
    url: server_url + "/addtwthidebyid.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{twtid: twtid.toString()},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: HIDE_TWITTER,
          index: twtindex
        });
      }
    }
  });
}

//隐藏指定用户的推特
export function hidetwtbyuid(tuid, uid, token, cb){
  common.ajax({
    url: server_url + "/hidetwthidebyuid.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{tuid: tuid.toString()},
    success:function(status, info, data){
        cb(status);
    }
  });
}

//不让他看到我的推特
export function hidemytwtbyuuid(tuid, uid, token, cb){
  common.ajax({
    url: server_url + "/hidemytwtbyuid.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{fuid: tuid.toString()},
    success:function(status, info, data){
        cb(status);
    }
  });
}

//上传聊天文件
export function pushtwtfile(file,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/addtwtfile.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{file: file},
    success:function(status, info, data){
      if(status == 200){
				cb(data);
      }
    }
  });
}

//添加分享链接
export function addtxtlink(linkurl,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/addtwtlink.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{url: linkurl},
    success:function(status, info, data){
      if(status == 200){
        cb(data);
      }
    }
  });
}

//发表推特
export function add_twitter(uid,token,content,imagestr,sharedlink,visible,dispatch,cb){
  common.ajax({
    url: server_url + "/addtwt.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{content: content, images: imagestr, url: sharedlink, visible: visible.toString()},
    success:function(status, info, data){
      cb(status,info,data);
      if(status == 200){
				dispatch({
          type: ADD_TWITTER,
        });
      }
    }
  });
}

export function disabletwtuser(index,userid,uid,token,dispatch){
  common.ajax({
    url: server_url + "/twtdisuserspk.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{tuid: userid.toString()},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: TOGGLEUSER_TIWTTER,
          index: index
        });
      }
    }
  });
}

export function enabletwtuser(index,userid,uid,token,dispatch){
  common.ajax({
    url: server_url + "/twtenuserspk.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{tuid: userid.toString()},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: TOGGLEUSER_TIWTTER,
          index: index
        });
      }
    }
  });
}

export function gettwtuser(page,pagenum,uid,token,dispatch){
  common.ajax({
    url: server_url + "/twtdeluserlist.jsp?uid=" + uid + "&token=" + token,
    type:"GET",
    data:{p: page.toString(), pnum: pagenum.toString()},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: LSUSER_TWITTER,
          page: page,
          list: data,
        });
      }
    }
  });
}

export function getemptwt(page,pagenum,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/getemployeetwt.jsp?uid=" + uid + "&token=" + token,
    type:"GET",
    data:{p: page.toString(), pnum: pagenum.toString()},
    success:function(status, info, data){
      if(status == 200){
        cb(data);
        dispatch({
          type: LIST_TWITTER,
          list: data,
          page: page,
        });
      }
    }
  });
}

//获取我发表的推特列表
export function getmyowntwt(page,pagenum,uid,token, dispatch,cb){
  common.ajax({
    url: server_url + "/getmyowntwt.jsp?uid=" + uid + "&token=" + token,
    type:"GET",
    data:{p: page.toString(), pnum: pagenum.toString()},
    success:function(status, info, data){
      if(status == 200){
        cb(data);
        dispatch({
          type: LIST_TWITTER,
          list: data,
          page: page,
        });
      }
    }
  });
}

//获取推特列表
export function gettwtlist(page,pagenum,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/getcompanytwt.jsp?uid=" + uid + "&token=" + token,
    type:"GET",
    data:{p: page.toString(), pnum: pagenum.toString()},
    success:function(status, info, data){
      if(status == 200){
        cb(data);
        dispatch({
          type: LIST_TWITTER,
          list: data,
          page: page,
        });
      }
    }
  });
}

//获取与我相关的消息
export function getmytwtmsg(page,pagenum,uid, token, dispatch,cb){
  common.ajax({
    url: server_url + "/gettwittermsg.jsp?uid="+uid+"&token="+token,
    type:"GET",
    data:{p: page.toString(), pnum: pagenum.toString()},
    success:function(status, info, data){
      if(status == 200){
        cb(data);
        dispatch({
          type: LIST_TWITTER,
          list: data,
          page: page,
        });
      }
    }
  });
}