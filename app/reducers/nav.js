import {
  NAVINDEX,NAV_1
} from '../actions/navbar';

function nav(state = {
  index: NAV_1,
}, action) {
  switch (action.type) {
    case NAVINDEX:
      return Object.assign({},state, {
                index: action.navindex
              });
    default:
      return state
  }
}

export default nav;
