import {
  GETDEPARTMENT,
	GETDEPARTMENTEMPLOYEE,
	GETTREESTRUCTURE,
	SETSELECTED,
	RENAMEDEPARTMENT,
} from '../actions/department';

export default function(state = {
  struct_arr : [],
	employee_arr : [],
	struct_trre : [],
	selected_department : 0,
	selected_departmentname : "",
	selected_departmentmnum : 0,
},action){
  switch (action.type) {
  	case RENAMEDEPARTMENT:
      return Object.assign({},state,{
        selected_departmentname: action.name,
      });
  	case SETSELECTED:
      return Object.assign({},state,{
        selected_department: action.id,
        selected_departmentname: action.name,
        selected_departmentmnum: action.num
      });
  	case GETTREESTRUCTURE:
      return Object.assign({},state,{
        struct_trre: action.list,
        employee_arr : [],
        selected_department : 0,
				selected_departmentname : "",
				selected_departmentmnum : 0,
      });
		case GETDEPARTMENTEMPLOYEE:
      return Object.assign({},state,{
        struct_arr: action.structure,
				employee_arr: action.employee,
				selected_department: action.selected
      });
    case GETDEPARTMENT:
      return Object.assign({},state,{
        struct_arr: action.struct_arr
      });
    default:
      return state
  }
}
