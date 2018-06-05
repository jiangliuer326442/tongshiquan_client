import {
  GETEMPLOYEE,
  ADDEMPLOYEE,
	SETCURRENT,
	SETMULTICURRENT
} from '../actions/employee';

export default function(state = {
  list : [],
	current : 0,
	selected: [],
	fresh_flg: false,
},action){
  switch (action.type) {
  	case SETMULTICURRENT:
      return Object.assign({},state,{
        selected: action.user_arr,
        fresh_flg: !state.fresh_flg
      });
		case SETCURRENT:
      return Object.assign({},state,{
        current: action.employeeid
      });
    case GETEMPLOYEE:
      return Object.assign({},state,{
        list: action.employee_list,
        fresh_flg: !state.fresh_flg,
        selected: [],
        current: 0,
      });
    case ADDEMPLOYEE:
      return state;
    default:
      return state
  }
}
