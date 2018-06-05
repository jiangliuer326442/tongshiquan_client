import {
  INIT_INNERMSG,
  RECEIVED_MSG,
  SENDED_MSG,
  PUSH_SENDED,
  UNREAD_NUM,
  SETREADFLG
} from '../actions/innermsg';

/**
  * 站内信
  */
function innermsg(state = {
  from_uid: 0, //发件人用户id,
  to_uid: 0, //收件人用户id
  to_name: "", //收件人昵称
  content: "", //信息内容
  receivedlist: [], //接收的站内信
  sendedlist: [], //发送的站内信,
  unreadnum: 0, //未读站内信数量
  refresh: false,
}, action) {
  switch (action.type) {
  	case SETREADFLG:
  		let id = action.id;
  		let index;
  		for(let i=0; i<state.receivedlist.length; i++){
  			if(state.receivedlist[i].id == id){
  				index = i;
  				break;
  			}
  		}
  		state.receivedlist[index].read_flg = true;
  		return Object.assign({}, state, {
  			unreadnum: state.unreadnum-1,
  			refresh: !state.refresh
  		});
  	case UNREAD_NUM:
  		return Object.assign({}, state, {
  			unreadnum: action.num
  		});
  	case PUSH_SENDED:
  		state.sendedlist.unshift(action.msg);
  		return Object.assign({}, state, {
  			sendedlist: state.sendedlist,
  			refresh: !state.refresh
  		});
  	case SENDED_MSG:
  		return Object.assign({},state,{
  			sendedlist: action.list,
  			refresh: !state.refresh
  		});
  	case RECEIVED_MSG:
  		return Object.assign({},state,{
  			receivedlist: action.list,
  			refresh: !state.refresh
  		});
    case INIT_INNERMSG:
      return Object.assign({},state, {
        from_uid: action.from_uid,
        to_uid: action.to_uid,
        to_name: action.to_name,
        content: "",
      });
    default:
      return state
  }
}

export default innermsg;
