/**
 * Created by 方海亮 on 2017/4/9.
 */
import {
	CALCULATERMWORDS,
	GETCOMMENTS,
	GETCOMMENTSFLAT,
	ADDCOMMENT,
	DELCOMMENT,
	SETREPLY,
	SETREPLYCONTENT,
	EDITZAN,
	SETCOMMENTAID,
	COMMENTSETPAGE,
	ADDREPLY,
	SHOWCOMMENT,
	MYCOMMENTS,
	WITHMYCOMMENTS
  } from '../actions/comment';
	
import {
	TOGGLECARE_FLG
} from '../actions/care';

function comment(state = {
    remainwords: 0,
    list: [],
	reply: {
		aid: 0,
		is_reply: false,
		cid: 0,
		content: ""
	},
	refresh: false,
	showcomment: false,
	aid: 0,
	num: 0,
	page: 1,
	pagenum: 15,
	mycomments: [],
	withmycomments: [],
}, action) {
		let list = state.list;
    switch (action.type) {
    	case WITHMYCOMMENTS:
    		return Object.assign({}, state, {
    			withmycomments: action.list,
    		});
    	case MYCOMMENTS:
    		return Object.assign({}, state, {
    			mycomments: action.list,
    		});
		case TOGGLECARE_FLG:
			for(let i=0; i<list.length; i++){
				if(list[i].uid == action.touid){
					let origin_care_flg = list[i].care_flg;
					let new_care_flg;
					if(origin_care_flg) new_care_flg = 0;
					else new_care_flg = 1;
					list[i].care_flg = new_care_flg;
				}
			}
			return Object.assign({},state,{
					list: list,
					refresh: !state.refresh
			});
		case SHOWCOMMENT:
			return Object.assign({}, state, {
				showcomment: action.showcomment
			});
		case ADDREPLY:
			var reply_status = state.reply.is_reply;
			return Object.assign({}, state, {
				reply:{
					aid: action.aid,
					cid: action.cid,
					is_reply: !reply_status,
					content: ""
				}
			});
		case COMMENTSETPAGE:
			return Object.assign({},state,{
					page: action.page
			});
		case SETCOMMENTAID:
			return Object.assign({},state,{
					aid: action.article_id
			});
		case ADDCOMMENT:
			let my_comment = action.comment;
			list.splice(0, 0, my_comment);
			return Object.assign({},state,{
					list: list,
					refresh: !state.refresh
			});
		case DELCOMMENT:
			for(let i=0; i<list.length; i++){
				if(list[i].id == action.cid){
					list.splice(i,1);
					break;
				}
			}
			return Object.assign({},state,{
					list: list,
					refresh: !state.refresh
			});
		case EDITZAN:
			let index = action.index;
			let comment = state.list[index];
			state.list[index].iszan = true;
			return Object.assign({},state,{
					list: state.list,
					refresh: !state.refresh
			});
		case SETREPLYCONTENT:
			state.reply.content = action.content;
			return state;
		case SETREPLY:
			var reply_status = state.reply.is_reply;
			return Object.assign({}, state, {
				reply:{
					aid: action.aid,
					cid: action.cid,
					is_reply: !reply_status,
					content: state.reply.content
				}
			});
        case CALCULATERMWORDS:
            return Object.assign({},state,{
                remainwords: action.length
            });
        case GETCOMMENTS:
            for(let i=0; i<action.list.length; i++){
                let inserttime = action.list[i].time.split(".")[0];
                let date = inserttime.split(" ")[0];
                let time = inserttime.split(" ")[1];
                action.list[i].time = date.split("-")[0] + "年" + date.split("-")[1] + "月" + date.split("-")[2] + "日" + " " + time.split(":")[0] + ":" + time.split(":")[1]
            }
            return Object.assign({},state,{
                list: action.list,
				refresh: !state.refresh
            });
				case GETCOMMENTSFLAT:
            for(let i=0; i<action.list.length; i++){
                let inserttime = action.list[i].time.split(".")[0];
                let date = inserttime.split(" ")[0];
                let time = inserttime.split(" ")[1];
                action.list[i].time = date.split("-")[0] + "年" + date.split("-")[1] + "月" + date.split("-")[2] + "日" + " " + time.split(":")[0] + ":" + time.split(":")[1]
            }
            return Object.assign({},state,{
                list: action.list,
								num: action.num
            });
        case ADDCOMMENT:
            list.push(action.comment);
            return Object.assign({},state,{
                list: list
            });
        default:
            return state
    }
}

export default comment;