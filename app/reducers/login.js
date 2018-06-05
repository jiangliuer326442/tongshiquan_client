import {
  LOGIN,AVATAR
} from '../actions/login';
import common from '../components/common';

function login(state = {
  uid: common.getItem('uid'),
  token: common.getItem('token'),
  companyid: common.getItem('companyid'),
  is_manager: common.getItem('is_manager'),
  avatar: common.getItem('avatar'),
}, action) {
  switch (action.type) {
    case AVATAR:
      common.setItem('avatar', action.avatar);
      return Object.assign({},state, {
                avatar: action.avatar
              });
    case LOGIN:
      common.setItem('companyid', action.companyid);
      common.setItem('is_manager', action.is_manager);
      common.setItem('uid', action.uid);
      common.setItem('token', action.token);
      return Object.assign({},state, {
                companyid: action.companyid,
                is_manager: action.is_manager,
                token: action.token,
                uid: action.uid
              });
    default:
      return state
  }
}

export default login;
