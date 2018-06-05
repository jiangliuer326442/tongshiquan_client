import {
  CM_GMYPHONE
} from '../actions/reg';
import {
	SETUSERINFO
} from '../actions/socket';
import {
	BINDFLG
} from '../actions/user';

export default function(state = {
	phone:"",
	avatar:"",
	nick:"",
	qq: false,
	wx: false,
	dd: false,
},action){
  switch (action.type) {
  	case BINDFLG:
			return Object.assign({},state,{
				qq: action.qq_flg,
				wx: action.wx_flg,
				dd: action.dd_flg,
			});
		case SETUSERINFO:
			return Object.assign({},state,{
				avatar: action.avatar,
				nick: action.nick,
				phone: action.phone
			});
		case CM_GMYPHONE:
			return Object.assign({},state,{
				phone: action.phone
			});
		default:
			return state
	}
}
