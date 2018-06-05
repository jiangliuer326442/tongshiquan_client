import CryptoJS from 'crypto-js';

import {
  ADDCONNACT,
  DELCONNACT,
  CURRENTCONNACT,
  GETDBS
} from '../actions/elastic';
import common from '../components/common';

function elastic(state = {
	link_arr:[],
  current_linkname: "",
  current_linkhost: "",
  current_linkport: 9200,
  current_linkuser: "",
  current_linkpass: ""
}, action) {
  var form_key = common.getkey();
  let link_arr = [];
  for(let i = 0; i < localStorage.length; i++){
  	let item_name = localStorage.key(i);
  	if(item_name.substr(0,5) == "link_"){
  	  let link = Object();
  	  let link_name = item_name.substr(5);
  	  var key  = CryptoJS.enc.Hex.parse(form_key);
  	  var iv   = CryptoJS.enc.Latin1.parse(form_key);
  	  var decrypted = CryptoJS.AES.decrypt(common.getItem(item_name),key,
  			  {
  				  iv:iv,
  				  mode:CryptoJS.mode.CBC,
  				  padding:CryptoJS.pad.Pkcs7
  			  });
  	  var result = decrypted.toString(CryptoJS.enc.Utf8);
  	  link.host = result.split('/')[0].split(':')[0];
  	  link.port = result.split('/')[0].split(':')[1];
  	  link.user = result.split('/')[1].split(':')[0];
  	  link.pass = result.split('/')[1].split(':')[1];
  	  link.name = link_name;
      link.dbs = [];
  	  link_arr.push(link);
  	}
  }
  state.link_arr = link_arr;
  switch (action.type) {
    case CURRENTCONNACT:
      return Object.assign({},state,{
        current_linkname: action.name,
        current_linkhost: action.host,
        current_linkport: action.port,
        current_linkuser: action.user,
        current_linkpass: action.pass
      });
    case GETDBS:
      for(let i = 0; i < link_arr.length; i++){
        if(link_arr[i].name == action.name){
          link_arr[i].dbs = action.dbs;
        }
      }
      return Object.assign({},state,{
        link_arr: link_arr
      });
  	case DELCONNACT:
  	  for(let i = 0; i < link_arr.length; i++){
  		  if(link_arr[i].name == action.name){
  			  delete link_arr[i];
  		  }
  	  }
      return Object.assign({},state,{
        link_arr: link_arr
      });
  	case ADDCONNACT:
  	  let link = Object();
  	  link.host = action.host;
  	  link.port = action.port;
  	  link.user = action.user;
  	  link.pass = action.pass;
  	  link.name = action.name;
      link.dbs = [];
  	  link_arr.push(link);
        return Object.assign({},state,{
          link_arr: link_arr
        });
      default:
          return state
  }
}

export default elastic;
