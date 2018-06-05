import {
  server_url
} from '../';

import common from '../components/common';

export const GETGONGGAOCFG = 'getgonggao';
export const INITGONGGAOCFG = 'initgonggao';
export const SETGONGGAOCFG = 'setgonggao';
export const ADDGONGGAOCFG = 'addgonggao';
export const DELGONGGAOCFG = 'delgonggao';

export function initgonggao(){
  return {
    type: INITGONGGAOCFG
  };
}

export function delgonggao(sectionid,uid,token,dispatch){
  common.ajax({
    url: server_url + "/post_delsection.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{sectionid: sectionid},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: DELGONGGAOCFG,
          sectionid: sectionid
        });
      }
    }
  });
}

// 获取公共模块的配置
export function getgonggaocfg(sectionid,uid,token,dispatch){
  common.ajax({
    url: server_url + "/post_getsectiondetail.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{sectionid: sectionid},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: GETGONGGAOCFG,
          is_allow_comment: data.is_allow_comment,
          is_hide_comment: data.is_hide_comment,
          leaderid: data.leaderid,
          logo: data.logo,
          name: data.name,
          sort: data.sort
        });
      }
    }
  });
}

//添加公告
export function addgonggao(model_name,logo,is_allow_comment,is_hide_comment,model_sort,leaderid,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/post_addsection.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{model_name: model_name, logo: logo, is_allow_comment: is_allow_comment, is_hide_comment: is_hide_comment, model_sort: model_sort, leaderid: leaderid},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: ADDGONGGAOCFG
        });
        cb();
      }
    }
  });
}

//设置公告
export function setgonggao(sectionid,model_name,logo,is_allow_comment,is_hide_comment,model_sort,leaderid,uid,token,dispatch,cb){
  common.ajax({
    url: server_url + "/post_setsection.jsp?uid=" + uid + "&token=" + token,
    type:"POST",
    data:{sectionid: sectionid, model_name: model_name, logo: logo, is_allow_comment: is_allow_comment, is_hide_comment: is_hide_comment, model_sort: model_sort, leaderid: leaderid},
    success:function(status, info, data){
      if(status == 200){
        dispatch({
          type: SETGONGGAOCFG,
          is_allow_comment: is_allow_comment,
          is_hide_comment: is_hide_comment,
          leaderid: leaderid,
          logo: data,
          name: model_name,
          sort: model_sort
        });
        cb();
      }
    }
  });
}
