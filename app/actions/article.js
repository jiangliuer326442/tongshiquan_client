import {
  server_url,history
} from '../';

import common from '../components/common';

export const ADDARTICLE = 'addarticle';
export const EDITARTICLE = 'editarticle';
export const DELARTICLE = 'delarticle';
export const GETARTICLES = 'getarticles';
export const GETFARTICLES = 'getfarticles';
export const GETOARTICLES = 'getoarticles';
export const SETARTICLE = 'setarticle';
export const GETARTICLE = 'getarticle';
export const GETARTICLEBYADMIN = 'getarticlebyadmin';
export const CHGISTOP = 'setarticleistop';
export const SETCURRENTSECTION = 'setcurrentsection';
export const GETARTICLELISTBYAID = 'getarticlelistbyaid';

//根据文章id获取文章列表
export function getarticlelistbyaid(aid,page,pagenum,dispatch,cb){
    common.ajax({
		url: server_url + "/getarticlesbyarticleid.jsp",
		type:"GET",
		data:{aid: aid,p: page,pnum: pagenum},
		success:function(status, info, data){
			cb(data.num);
		  dispatch({
			  type: GETARTICLELISTBYAID,
			  list: data.list
		  });
		}
    });
}

export function delarticle(aid,uid,token,dispatch,cb){
    common.ajax({
		url: server_url + "/del_article.jsp?uid=" + uid + "&token=" + token,
		type:"POST",
		data:{aid: aid.toString()},
		success:function(status, info, data){
		  if(status == 200){
			cb();
		  }
		}
    });
	dispatch({
		type: DELARTICLE,
		aid: aid
	});
}

export function setarticleistop(aid,is_top,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/setistop.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{aid: aid.toString(), is_top: is_top.toString()},
    success:function(status, info, data){
      if(status == 200){
				cb();
      }
    }
  });
	dispatch({
		type: CHGISTOP,
		aid: aid
	});
}

export function getarticlebyadmin(uid,token,aid,dispatch,cb){
  common.ajax({
    url: server_url + "/getarticlebyadmin.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{aid: aid.toString()},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: GETARTICLEBYADMIN,
          id: aid,
          title: data.title,
          content: data.content,
          desc: data.desc,
          showtime: data.showtime,
          is_allow_comment: data.is_allow_comment,
          is_hide_comment: data.is_hide_comment,
          is_top: data.is_top
        });
				cb();
      }
    }
  });
}

export function getarticle(uid,token,companyid,articleid,dispatch,cb){
  common.ajax({
    url: server_url + "/getarticle.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{companyid: companyid, articleid: articleid.toString()},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: GETARTICLE,
          id: articleid,
          title: data.title,
					care_flg: data.care_flg,
          content: data.content,
          commenttimes: data.commenttimes,
          readtimes: data.readtimes,
          is_allow_comment: data.is_allow_comment,
          is_hide_comment: data.is_hide_comment,
          inserttime: data.inserttime.split(".")[0],
					user_avatar: data.user_avatar,
					userid: data.userid,
					user_nick: data.user_nick,
        });
				cb();
      }
    }
  });
}

export function setarticle(id,title,companyid,dispatch){
  dispatch({
    type: SETARTICLE,
    id: id,
    title: title
  });
  history.push('/article/' + companyid + '/'+id);
}

export function setcurrentsection(sectionid,dispatch){
	dispatch({
		type: SETCURRENTSECTION,
		sectionid: sectionid
	});
}

export function getoarticles(companyid,dispatch){
  common.ajax({
    url: server_url + "/getoarticles.jsp?",
    type:"POST",
    data:{companyid: companyid, size: "4"},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: GETOARTICLES,
					list: data
        });
      }
    }
  });
}

export function getfarticles(companyid,dispatch){
  common.ajax({
    url: server_url + "/getfarticles.jsp?",
    type:"POST",
    data:{companyid: companyid},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: GETFARTICLES,
          title: data.model_name,
          list: data.list
        });
      }
    }
  });
}

//获取文章列表
export function getarticles(sectionid,uid,token,dispatch){
  common.ajax({
    url: server_url + "/getarticles.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{sectionid: sectionid},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: GETARTICLES,
          list: data
        });
      }
    }
  });
}

//修改文章
export function editarticle(articleid,title,desc,content,is_allow_comment,is_hide_comment,is_top,showtime,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/edit_article.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{aid: articleid.toString(), title: title, desc: desc, content: content, is_allow_comment: is_allow_comment, is_hide_comment: is_hide_comment,is_top: is_top, showtime: showtime},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: EDITARTICLE,
		  id: articleid,
		  title: title,
		  content: content,
		  desc: desc,
		  showtime: showtime,
		  is_allow_comment: is_allow_comment,
		  is_hide_comment: is_hide_comment,
		  is_top: is_top
        });
        cb();
      }
    }
  });
}

//发表文章
export function addarticle(sectionid,title,desc,content,content_txt,is_allow_comment,is_hide_comment,is_top,showtime,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/add_article.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{sectionid: sectionid, title: title, desc: desc, content: content, content_txt: content_txt, is_allow_comment: is_allow_comment, is_hide_comment: is_hide_comment,is_top: is_top, showtime: showtime},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: ADDARTICLE
        });
        cb();
      }
    }
  });
}
