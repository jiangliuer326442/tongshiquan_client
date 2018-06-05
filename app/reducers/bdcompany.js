import {
  SHOW,
  SETCOMPANY,
  GETCOMPANY
} from '../actions/bdcompany';

function bdcompany(state = {
  bindcompany_flg: true,
  companyList: [],
  selected_company:""
}, action) {
  switch (action.type) {
    case SHOW:
      return Object.assign({},state, {
                bindcompany_flg: action.bindcompany_flg
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

export default bdcompany;
