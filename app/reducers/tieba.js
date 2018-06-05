import {
  ADDTIEBA,
  LISTTIEBA,
	LSTIEBAAPPRV,
	GETTIEBAAPPRV,
	GETTIEBACFG,
  SETTIEBACFG
} from '../actions/tieba';

export default function(state = {
  list: [],  //贴吧数组
	appvlist: [], //贴吧申请数组,
	appv: {	//当前申请对象
		id: 0,
		title: "",
		desc: "",
		logo: ""
	},
	is_allow_comment: true,
	is_hide_comment: true,
	can_post_flg: true,
	leaderid: 0,
	logo: "",
	name: "",
	sort: 0,
	descs: ""
},action){
  switch(action.type){
    case ADDTIEBA:
      return state;
    case SETTIEBACFG:
      return Object.assign({},state,{
        is_allow_comment: action.is_allow_comment,
        is_hide_comment: action.is_hide_comment,
        can_post_flg: action.can_post_flg,
        leaderid: action.leaderid,
        logo: action.logo,
        name: action.name,
        sort: action.sort,
        descs: action.descs
      });
    case GETTIEBACFG:
      return Object.assign({},state,{
				is_allow_comment: action.is_allow_comment,
				is_hide_comment: action.is_hide_comment,
				can_post_flg: action.can_post_flg,
				leaderid: action.leaderid,
				logo: action.logo,
				name: action.name,
				sort: action.sort,
				descs: action.descs
      });
		case GETTIEBAAPPRV:
			for(let i=0; i<state.appvlist.length; i++){
				if(state.appvlist[i].id == action.id){
					let appv = {};
					appv.id = action.id;
					appv.title = state.appvlist[i].title;
					appv.desc = state.appvlist[i].desc;
					appv.logo = state.appvlist[i].logo;
					appv.user = state.appvlist[i].user_name;
					return Object.assign({},state,{
						appv: appv
					});
				}
			}
			return state;
    case LISTTIEBA:
      return Object.assign({},state,{
        list: action.list
      });
    case LSTIEBAAPPRV:
      return Object.assign({},state,{
        appvlist: action.list
      });
    default:
      return state;
  }
}
