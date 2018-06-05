import {
  GETGONGGAOCFG,
  INITGONGGAOCFG,
  SETGONGGAOCFG
} from '../actions/gonggao';

export default function(state = {
  isloading: true,
  is_allow_comment: true,
  is_hide_comment: true,
  leaderid: 0,
  logo: "",
  name: "",
  sort: 0
},action){
  switch(action.type){
    case GETGONGGAOCFG:
      return Object.assign({},state,{
        isloading: false,
        is_allow_comment: action.is_allow_comment,
        is_hide_comment: action.is_hide_comment,
        leaderid: action.leaderid,
        logo: action.logo,
        name: action.name,
        sort: action.sort
      });
    case INITGONGGAOCFG:
      return Object.assign({},state,{
        isloading: false
      });
    case SETGONGGAOCFG:
    return Object.assign({},state,{
      is_allow_comment: action.is_allow_comment,
      is_hide_comment: action.is_hide_comment,
      leaderid: action.leaderid,
      logo: action.logo,
      name: action.name,
      sort: action.sort
    });
    default:
      return state;
  }
}
