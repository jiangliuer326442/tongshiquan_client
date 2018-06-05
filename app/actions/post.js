import {
  server_url,history
} from '../';

import common from '../components/common';

export const ADDPOST = 'addpost';
export const POSTPAGE = 'postpage';
export const GETPOSTS = 'getposts';
export const GETALLPOSTS = 'getallposts';
export const GETSECTIONPOSTS = 'getsectionposts';
export const POSTSETPAGE = 'postsetpage';
export const GETMYPOSTS = 'getmyposts';

//获取我发表的帖子列表
export function getmyposts(uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/getmyposts.jsp?uid="+uid+"&token="+token,
    type:"GET",
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: GETMYPOSTS,
					list: data
        });
        cb();
      }
    }
  });
}

//获取某个分类的帖子
export function getsectionposts(companyid,sectionid,page,pagenum,dispatch,cb){
  common.ajax({
    url: server_url + "/getsectionposts.jsp?p="+page.toString()+"&pnum="+pagenum.toString(),
    type:"POST",
    data:{companyid: companyid, sectionid: sectionid},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: GETSECTIONPOSTS,
          num: info,
					list: data
        });
        cb();
      }
    }
  });
}

//获取全部帖子
export function getallposts(companyid,dispatch,cb){
  common.ajax({
    url: server_url + "/getposts.jsp?",
    type:"POST",
    data:{companyid: companyid},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: GETALLPOSTS,
					list: data
        });
        cb();
      }
    }
  });
}

export function setpage(page,dispatch){
	dispatch({
		type: POSTSETPAGE,
		page: page
	});
}

//添加帖子
export function addpost(sectionid,title,content,content_txt,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/addpost.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{sectionid: sectionid, title: title, content: content, content_txt: content_txt},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: ADDPOST
        });
        cb();
      }
    }
  });
}
