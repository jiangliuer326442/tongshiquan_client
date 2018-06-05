import {
  GET_COMPANY_INFO,
  GET_EMPLOYEE_INFO,
  GETGLBSETTING,
  SETGLBSETTING,
  GETMYCOMPANYINFO
} from '../actions/company';

import {
  SETMYAVATAR,
  SETMYNICK
} from '../actions/user';

export default function(state = {
  isloading: true,
  allow_visit_time: "||",
  is_allow_register: null,
  is_postbar_audit: null,
  is_allowvisit: null,
  companyname: "",
  companyno: "",
  companyopername: "",
  companylogo: "",
  companystartdate: "",
  is_admin:null,
  models:[],
  avatar:"",
  uname:"",
  umail:"",
  unick:"",
  uphone:"",
	companyid:""
},action){
  switch (action.type) {
  	case GETMYCOMPANYINFO:
      return Object.assign({},state, {
        companyname: action.name,
        companyno: action.no,
        companyopername: action.opername,
        companystartdate: action.startdate
      });
		case SETMYAVATAR:
      return Object.assign({},state, {
        avatar: action.avatar
      });
    case SETMYNICK:
      return Object.assign({},state, {
        unick: action.nick
      });
    case GETGLBSETTING:
      return Object.assign({},state,{
        isloading: false,
        allow_visit_time: action.allow_visit_time,
        is_allow_register: action.is_allow_register,
        is_postbar_audit: action.is_postbar_audit,
        is_allowvisit: action.is_allowvisit,
        companylogo: action.logo
      });
    case SETGLBSETTING:
      return Object.assign({},state,{
        allow_visit_time: action.allow_visit_time,
        is_allow_register: action.is_allow_register,
        is_postbar_audit: action.is_postbar_audit,
        is_allowvisit: action.is_allowvisit,
        companylogo: action.logo
      });
    case GET_COMPANY_INFO:
      return Object.assign({},state, {
                companyname: action.name,
				companylogo: action.logo
              });
    case GET_EMPLOYEE_INFO:
      return Object.assign({},state, {
        companyid: action.companyid,
        is_admin: action.is_admin,
        models: action.models,
        avatar: action.avatar,
        uname: action.uname,
        unick: action.unick,
        umail: action.umail,
        uphone: action.uphone
      });
    default:
      return state
  }
}
