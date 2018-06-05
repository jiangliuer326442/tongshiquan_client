import {
  SETCARDUSER
} from '../actions/userlink';

function userlink(state = {
  uid: -1, //显示的用户ID
}, action) {
    switch (action.type) {
      case SETCARDUSER:
        return Object.assign({},state,{
          uid: action.uid
        });
      default:
        return state
    }  
}

export default userlink;