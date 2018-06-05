import {
  SETNAV,
	NAV1,
	NAV2,
	NAV3,
	PUSHCHAT,
	GETRECENTCHAT,
	GETCHATLOG,
	ADDCHAT,
	GETCHATMSG
} from '../actions/chat';

import {
	MARKUSER
} from '../actions/user';

import {
  FRIENDLIST,
	SELECTEDFRIEND,
	DELFRIEND
} from '../actions/friendslist';

function sortfriends(list){
		let friendlist = [{fletter:'#', list:[]}];
		let base = 65;
		for(let i=0; i<26; i++){
			let object = {};
			object = {};
			object.fletter = String.fromCharCode(base+i);
			object.list = [];
			friendlist.push(object);
		}
		for(let i=0; i<list.length; i++){
			let value = list[i];
			let fletter = value.fletter;
			let friendlist_index = fletter.charCodeAt() - base;
			if(friendlist_index<0){
				friendlist_index = -1;
			}
			friendlist[friendlist_index+1].list.push(value);
		}
		for(let i=0; i<friendlist.length; i++){
				if(friendlist[i].list.length == 0){
					friendlist.remove(i);
					i--;
				}
		}
		return friendlist;
}

function chat(state = {
  nav: NAV1,
	recentuser:[],
  friendslist: [],
	sortedfriendlist: [],
	chatlog: [],
	selectedfrienduid: 0,
	selectedfrienduname: "",
	selectedfriendavatar: "",
	fresh: false,
	page: 1,
	pagenum: 20,
}, action) {
	  switch (action.type) {
			case DELFRIEND:
				for(let i=0; i<state.recentuser.length; i++){
					if(state.recentuser[i].touid == action.uid){
						state.recentuser.remove(i);
						break;
					}
				}
				//删除聊天记录
				state.chatlog.remove(action.uid);
				//删除好友
				for(let i=0; i<state.friendslist.length; i++){
					if(state.friendslist[i].friend_uid == action.uid){
						state.friendslist.remove(i);
						break;
					}
				}
				return Object.assign({},state,{
					fresh: !state.fresh,
					sortedfriendlist: sortfriends(state.friendslist),
					selectedfrienduid: 0,
					selectedfrienduname: "",
					selectedfriendavatar: "",
				});
			case GETCHATMSG:
				for(let i=0; i<state.recentuser.length; i++){
					if(state.recentuser[i].touid == action.fuid){
						state.recentuser.remove(i);
						break;
					}
				}
				let pusheduser3 = {
					touid: action.fuid,
					username: action.username,
					avatar: action.avatar,
					content: action.content,
					content_type: action.content_type
				};
				state.recentuser.unshift(pusheduser3);
				//追加聊天记录
				if(typeof(state.chatlog[action.fuid]) != 'undefined'){
					state.chatlog[action.fuid].push({
						tuid: action.tuid,
						fuid: action.fuid,
						content: action.content,
						content_type: action.content_type
					});
				}
				return Object.assign({},state,{
					fresh: !state.fresh
				});
			case ADDCHAT:
				//更新最近联系人
				//移除最近聊天中该人的信息
				for(let i=0; i<state.recentuser.length; i++){
					if(state.recentuser[i].touid == action.tuid){
						state.recentuser.remove(i);
						break;
					}
				}
				let pusheduser2 = {
					touid: action.tuid,
					username: state.selectedfrienduname,
					avatar: state.selectedfriendavatar,
					content: action.content,
					content_type: action.content_type
				};
				state.recentuser.unshift(pusheduser2);
				//最近聊天记录
				state.chatlog[action.tuid].push({
					fuid: action.fuid,
					tuid: action.tuid,
					content: action.content,
					content_type: action.content_type
				});
				return Object.assign({},state,{
					fresh: !state.fresh
				});
			case GETCHATLOG:
				if(typeof(state.chatlog[action.uid]) == 'undefined'){
					state.chatlog[action.uid] = new Array();
				}
				state.chatlog[action.uid] = action.list;
				return Object.assign({},state,{
					fresh: !state.fresh
				});
			case GETRECENTCHAT:
				return Object.assign({},state,{
					recentuser: action.list
				});
			case PUSHCHAT:
				//移除最近聊天中该人的信息
				let tochatuser = null;
				for(let i=0; i<state.recentuser.length; i++){
					if(state.recentuser[i].touid == action.uid){
						tochatuser = state.recentuser[i];
						state.recentuser.remove(i);
						break;
					}
				}
				let pusheduser = {
					touid: action.uid,
					username: state.selectedfrienduname,
					avatar: state.selectedfriendavatar,
					content: tochatuser!=null?tochatuser.content:"",
					content_type: tochatuser!=null?tochatuser.content_type:""
				};
				state.recentuser.unshift(pusheduser);
				return Object.assign({},state,{
					fresh: !state.fresh
				});
			case MARKUSER:
				for(let i=0; i<state.friendslist.length; i++){
					if(state.friendslist[i].friend_uid == action.touid){
						state.friendslist[i].username = action.markname
						break;
					}
				}
				for(let i=0; i<state.sortedfriendlist.length; i++){
					for(let j=0; j<state.sortedfriendlist[i].list.length; j++){
						let userobj = state.sortedfriendlist[i].list[j];
						if(userobj.friend_uid == action.markname){
							state.sortedfriendlist[i].list[j].username = action.markname
							break;
						}
					}
				}
				return Object.assign({},state,{
					friendslist: state.friendslist,
					sortedfriendlist: state.sortedfriendlist,
					selectedfrienduname: action.markname,
					fresh: !state.fresh
				});
			case SELECTEDFRIEND:
				return Object.assign({},state,{
					selectedfrienduid: action.uid,
					selectedfrienduname: action.uname,
					selectedfriendavatar: action.avatar,
				});
			case SETNAV:
				return Object.assign({},state,{
					nav: action.nav
				});
			case FRIENDLIST:
				return Object.assign({},state,{
					friendslist: action.list,
					sortedfriendlist: sortfriends(action.list)
				});
			default:
				return state
	  }
}

export default chat;
