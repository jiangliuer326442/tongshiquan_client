/**
 * Created by 方海亮 on 2017/4/9.
 */
import {
    server_url
    } from '../';

import common from '../components/common';

export const SETCOMMENTAID = 'setcommentaid';
export const SHOWCOMMENT = 'cm_showcomment';
export const CALCULATERMWORDS = 'cm_calculatewords';
export const ADDCOMMENT = 'cm_addcomment';
export const ADDREPLY	= 'cm_addreply';
export const GETCOMMENTS = "cm_getcomments";
export const GETCOMMENTSFLAT = "cm_getcomments_flat";
export const SETREPLY = "cm_setreply";
export const SETREPLYCONTENT = "cm_setreplycontent";
export const EDITZAN = "cm_editzan";
export const COMMENTSETPAGE = "cm_setpage";
export const DELCOMMENT = "cm_delcomment";
export const MYCOMMENTS = "cm_getmycomments";
export const WITHMYCOMMENTS = "cm_getwithmycomments";

export function getwithmycomments(uid,token,dispatch){
    common.ajax({
        url: server_url + "/getwithmycomments.jsp?uid=" + uid + "&token=" + token,
        type:"GET",
        success:function(status, info, data){
			dispatch({
				type: WITHMYCOMMENTS,
				list: data
			});
        }
    });
}

export function getmycomments(uid,token,dispatch,cb){
    common.ajax({
        url: server_url + "/getmycomments.jsp?uid=" + uid + "&token=" + token,
        type:"GET",
        success:function(status, info, data){
			dispatch({
				type: MYCOMMENTS,
				list: data
			});
        }
    });
}

export function showcomment(showcomment_flg, dispatch){
	dispatch({
		type: SHOWCOMMENT,
		showcomment: showcomment_flg
	});
}

export function delcomment(aid,cid,uid,token,dispatch,cb){
    common.ajax({
        url: server_url + "/delcomment.jsp?uid=" + uid + "&token=" + token,
        type:"POST",
        data:{cid: cid.toString(), aid: aid.toString()},
        success:function(status, info, data){
					cb(status);
        }
    });
	dispatch({
		type: DELCOMMENT,
		cid: cid
	});
}

export function setpage(page,dispatch){
	dispatch({
		type: COMMENTSETPAGE,
		page: page
	});
}

export function setcommentaid(aid,dispatch){
	dispatch({
		type: SETCOMMENTAID,
		article_id: aid
	});
}

export function editzan(cid,uid,token,index,dispatch){
	common.ajax({
			url: server_url + "/zan.jsp?uid=" + uid + "&token=" + token,
			type:"POST",
			data:{cid: cid.toString()},
			success:function(status, info, data){
				cb(status);
			}
	});
	dispatch({
		type: EDITZAN,
		index: index
	});
}

export function setreplycontent(content,dispatch){
	dispatch({
		type: SETREPLYCONTENT,
		content: content
	});
}

export function setreply(aid,cid,dispatch){
	dispatch({
		type: SETREPLY,
		aid: aid,
		cid:  cid
	});
}

export function getcomments_flat(aid,companyid,page,pagenum,uid,token,dispatch,cb){
    common.ajax({
        url: server_url + "/getcomments_flat.jsp?p=" + page + "&pnum=" + pagenum + "&uid=" + uid + "&token=" + token,
        type:"POST",
        data:{aid: aid.toString(), companyid: companyid},
        success:function(status, info, data){
            if(status==200){
                dispatch({
                    type: GETCOMMENTSFLAT,
                    list: data,
					num: info
                });
            }
        }
    });
}

export function getcomments(aid,page,companyid,uid,token,dispatch,cb){
    common.ajax({
        url: server_url + "/getcomments.jsp?p=" + page + "&uid=" + uid + "&token=" + token,
        type:"POST",
        data:{aid: aid, companyid: companyid},
        success:function(status, info, data){
            if(status==200){
                dispatch({
                    type: GETCOMMENTS,
                    list: data
                });
            }
        }
    });
}

export function addreply(aid,cid,content,uid,token,dispatch,cb){
    common.ajax({
        url: server_url + "/addcommentreply.jsp?uid=" + uid + "&token=" + token,
        type:"POST",
        data:{aid: aid,cid: cid.toString(), content: content},
        success:function(status, info, data){
					cb(status);
					dispatch({
						type: ADDREPLY,
						aid: aid,
						cid: cid
					});
        }
    });
}

export function addcomment(aid,content,avatar,uname,uid,token,dispatch,cb){
		dispatch({
			type: ADDCOMMENT,
			comment: {
				avatar: avatar,
				comment: content,
				history_records: [],
				id: 0,
				iszan: 0,
				nick: uname,
				phone: "",
				time: "刚刚",
				zannum: 0
			}
		});
    common.ajax({
        url: server_url + "/addcomment.jsp?uid=" + uid + "&token=" + token,
        type:"POST",
        data:{aid: aid, content: content},
        success:function(status, info, data){
					cb(status);
        }
    });
}

export function calculatewords(words,dispatch){
    let maxlength = 100;
    let customelength = words.length;
    let remainlength = maxlength - customelength;
    dispatch({
        type: CALCULATERMWORDS,
        length: remainlength
    });
}