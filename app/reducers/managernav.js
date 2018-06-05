import {
  SETBIGKINDID,
  SETSMKINDID,
  GETSECTIONLIST
} from '../actions/manager';

import{
  DELGONGGAOCFG
} from '../actions/gonggao';

function managernav(state = {
  current_refid: 0,
  current_refname: "管理",
  current_selected: 0,
  section_list: []
}, action) {
  switch (action.type) {
    case SETBIGKINDID:
      return Object.assign({},state,{
        current_refid: action.current_refid,
				current_selected: 1,
        current_refname: action.current_refname
      });
    case SETSMKINDID:
      return Object.assign({},state,{
        current_selected: action.current_selected
      });
	  case GETSECTIONLIST:
      return Object.assign({},state,{
        section_list: action.sectionlist
      });
    case DELGONGGAOCFG:
      let section_list = state.section_list;
      for(let i=0; i<section_list.length; i++){
        if(section_list[i].id == action.sectionid){
          section_list.splice(i,1);
        }
      }
      return Object.assign({},state,{
        section_list: section_list
      });
    default:
      return state
  }
}

export default managernav;
