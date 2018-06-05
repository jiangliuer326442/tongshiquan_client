import {
	SENDREGCODE,
	SETCOMPANY,
	GETCOMPANY
} from '../actions/reglog';

function reglog(state = {
	selected_company: "",
	phone: "",
	password: ""
}, action) {
	switch (action.type) {
		case SENDREGCODE:
			return Object.assign({},state, {
				phone: action.phone,
				password: action.password,
			});
		case SETCOMPANY:
			return Object.assign({},state, {
				selected_company: action.selected_company
			});
		case GETCOMPANY:
			return Object.assign({},state, {
				companyList: action.companyList,
				selected_company: action.selected_company
			});
		default:
			return state
	}
}

export default reglog;
