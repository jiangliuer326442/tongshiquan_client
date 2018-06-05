import {
  server_url
} from '../';

import common from '../components/common';

export const GETTIEBACFG = 'gettiebacfg';
export const SETTIEBACFG = 'settiebacfg';
export const LSTIEBAAPPRV = 'lstiebaapprov';
export const ADDTIEBA = 'addtieba';
export const LISTTIEBA = 'lstieba';
export const GETTIEBAAPPRV = 'gttiebaapprov';
export const HANDLETIEBAAPPRV = 'handletiebaapprov';

//设置贴吧
export function settieba(sectionid,model_name,logo,desc,can_post_flg,is_allow_comment,is_hide_comment,model_sort,leaderid,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/tieba_setsection.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{sectionid: sectionid, model_name: model_name, logo: logo, desc: desc, can_post_flg: can_post_flg, is_allow_comment: is_allow_comment, is_hide_comment: is_hide_comment, model_sort: model_sort, leaderid: leaderid},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: SETTIEBACFG,
          is_allow_comment: is_allow_comment,
          is_hide_comment: is_hide_comment,
          can_post_flg: can_post_flg,
          leaderid: leaderid,
          logo: data,
          name: model_name,
          sort: model_sort,
          descs: desc
        });
        cb();
      }
    }
  });
}

export function gettiebacfg(sectionid,uid,token,dispatch){
  common.ajax({
    url: server_url + "/tieba_getsectiondetail.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{sectionid: sectionid},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: GETTIEBACFG,
          is_allow_comment: data.is_allow_comment,
          is_hide_comment: data.is_hide_comment,
          can_post_flg: data.can_post_flg,
          leaderid: data.leaderid,
          logo: data.logo,
          name: data.name,
          sort: data.sort,
					descs: data.descs
        });
      }
    }
  });
}

//处理贴吧申请
export function handletiebaapprov(id,title,logo,desc,status,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/tieba_handleapproval.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{id:id.toString(),title: title, logo: logo, desc: desc, status: status},
    success:function(status, info, data){
      if(status == 200 || status == 2000){
        dispatch({
          type: HANDLETIEBAAPPRV
        });
				cb(status);
      }
    }
  });
}

//设置贴吧申请
export function gttiebaapprov(id,dispatch,cb){
	dispatch({
		type: GETTIEBAAPPRV,
		id: id
	});
	cb();
}

//获取贴吧申请列表
export function lstiebaapprov(uid,token,dispatch){
  common.ajax({
    url: server_url + "/tieba_approval.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: LSTIEBAAPPRV,
					list: data
        });
      }
    }
  });
}

//贴吧列表
export function lstieba(companyid,dispatch){
  common.ajax({
    url: server_url + "/tieba_getsectionlist.jsp?",
    type:"POST",
    data:{companyid: companyid},
    success:function(status, info, data){
      if(status == 200 || status == 2000){
        dispatch({
          type: LISTTIEBA,
					list: data
        });
      }
    }
  });
}

//添加贴吧
export function addtieba(model_name,logo,desc,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/tieba_addsection.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{title: model_name, logo: logo, desc: desc},
    success:function(status, info, data){
      if(status == 200 || status == 2000){
        dispatch({
          type: ADDTIEBA
        });
      }
      cb(status);
    }
  });
}
