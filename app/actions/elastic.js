import CryptoJS from 'crypto-js';

import {
  server_url
} from '../';

import common from '../components/common';

export const ADDCONNACT = 'es_testconnect';
export const DELCONNACT = 'es_delconnect';
export const CURRENTCONNACT = 'es_curconnect';
export const GETDBS = 'es_getdbs';

export function setcrtconnact(name,host,port,user,pass,dispatch){
  dispatch({
    type: CURRENTCONNACT,
    name: name,
    host: host,
    port: port,
    user: user,
    pass: pass
  });
}

export function delconnact(contact_name,dispatch){
	dispatch({
		type: DELCONNACT,
		name: contact_name
	});
	localStorage.removeItem("link_" + contact_name);
}

export function getdbs(linkname,host,port,username,password,dispatch,cb){
  common.ajax({
    url: server_url + "/elastic_getdbs.jsp?",
    type:"POST",
    data:{host: host, port: port, username: username, password: password},
    success:function(status, info, data){
      dispatch({
        type: GETDBS,
        name: linkname,
        dbs: data.list
      });
    }
  });
}

export function addconnect(linkname,host,port,username,password,dispatch,cb){
  common.ajax({
    url: server_url + "/elastic_connect.jsp?",
    type:"POST",
    data:{host: host, port: port, username: username, password: password},
    success:function(status, info, data){
      cb(status);
      if(status == 200){
		dispatch({
			type: ADDCONNACT,
			name: linkname,
			host: host,
			port: port,
			user: username,
			pass: password
		});
        var form_key = common.getkey();
        var key  = CryptoJS.enc.Hex.parse(form_key);
        var iv   = CryptoJS.enc.Latin1.parse(form_key);
        var encrypted = CryptoJS.AES.encrypt(host+":"+port+"/"+username+":"+password,key,
                {
                    iv:iv,
                    mode:CryptoJS.mode.CBC,
                    padding:CryptoJS.pad.Pkcs7
                });
   	    common.setItem("link_"+linkname,encrypted);
      }
    }
  });
}
