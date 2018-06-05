import {
  LIST_TWITTER,
  HIDE_TWITTER,
  HIDEUSER_TWITTER,
  DELHDUSER_TWITTER,
  SETTWITTER_ZAN,
  SETTWITTER_UNZAN,
  ADDCOMMENT_TWITTER,
  ADDREPLY_TWITTER,
  LSUSER_TWITTER,
  TOGGLEUSER_TIWTTER,
  GETVISIBLE_TWTTTER
} from '../actions/twitter';

function twitter(state = {
	page: 1,
	pagenum: 5,
  twitter_list: [],
  user_list: [],
  fresh_flg: false,
  hideuser_list: [],
  visiblels: [],
}, action) {
  switch (action.type) {
    case GETVISIBLE_TWTTTER:
        let visiblels = [];
        for(let i=0; i<action.data.length; i++){
          visiblels[action.data[i]['id']] = {
            name: action.data[i]['name'],
            icon: action.data[i]['icon']
          };
        }
        return Object.assign({},state, {
                visiblels: visiblels
              });
    case TOGGLEUSER_TIWTTER:
      state.user_list[action.index].can_speak = !state.user_list[action.index].can_speak;
        return Object.assign({},state, {
                fresh_flg: !state.fresh_flg
              });
    case LSUSER_TWITTER:
      if(action.page == 1){
        return Object.assign({},state, {
                user_list: action.list,
                fresh_flg: !state.fresh_flg
              });
      }else{
        state.user_list.push.apply(state.user_list, action.list);
        return Object.assign({},state, {
                fresh_flg: !state.fresh_flg,
                page: action.page,
              });
      }
    case ADDREPLY_TWITTER:
      state.twitter_list[action.index].comment.unshift({
        avatar: action.avatar,
        content: action.content,
        create_time: "刚刚",
        id: 0,
        nick: action.nick,
        uid: action.uid,
        uperid: action.uperid,
      });
      return Object.assign({},state, {
                twitter_list: state.twitter_list,
                fresh_flg: !state.fresh_flg
              });
    case ADDCOMMENT_TWITTER:
      state.twitter_list[action.index].comment.unshift({
        avatar: action.avatar,
        content: action.content,
        create_time: "刚刚",
        id: 0,
        nick: action.nick,
        uid: action.uid,
        uperid: 0
      });
      return Object.assign({},state, {
                twitter_list: state.twitter_list,
                fresh_flg: !state.fresh_flg
              });
    case SETTWITTER_UNZAN:
      state.twitter_list[action.index].zan_flg = 0;
      state.twitter_list[action.index].zan_num = state.twitter_list[action.index].zan_num - 1;
      return Object.assign({},state, {
                hideuser_list: state.hideuser_list,
                fresh_flg: !state.fresh_flg
              });
    case SETTWITTER_ZAN:
      state.twitter_list[action.index].zan_flg = 1;
      state.twitter_list[action.index].zan_num = state.twitter_list[action.index].zan_num + 1;
      return Object.assign({},state, {
                hideuser_list: state.hideuser_list,
                fresh_flg: !state.fresh_flg
              });
    case HIDEUSER_TWITTER:
      return Object.assign({}, state, {
        hideuser_list: action.list,
        fresh_flg: !state.fresh_flg
      })
    case DELHDUSER_TWITTER:
      state.hideuser_list.remove(action.index);
      return Object.assign({},state, {
                hideuser_list: state.hideuser_list,
                fresh_flg: !state.fresh_flg
              });
    case HIDE_TWITTER:
      state.twitter_list.remove(action.index);
      return Object.assign({},state, {
                twitter_list: state.twitter_list,
                fresh_flg: !state.fresh_flg
              });
    case LIST_TWITTER:
      if(action.page == 1){
        return Object.assign({},state, {
                twitter_list: action.list,
                page: 1,
                fresh_flg: !state.fresh_flg
              });
      }else{
        state.twitter_list.push.apply(state.twitter_list, action.list);
        return Object.assign({},state, {
                fresh_flg: !state.fresh_flg,
                page: action.page,
              });
      }
    default:
      return state;
  }
}

export default twitter;