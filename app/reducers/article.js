import {
  ADDARTICLE,
  GETARTICLES,
  GETFARTICLES,
  SETARTICLE,
  GETARTICLE,
  GETARTICLEBYADMIN,
  CHGISTOP,
  DELARTICLE,
  GETOARTICLES,
  SETCURRENTSECTION,
  GETARTICLELISTBYAID
} from '../actions/article';

import {
	TOGGLECARE_FLG
} from '../actions/care';

function article(state = {
  articlelist: [],
	oarticles: [],
	oarticles: [],
	coarticlesection: 0,
  title: "",
  id: 0,
  content: "",
  desc: "",
  inserttime: "",
  showtime: "",
  commenttimes: 0,
  readtimes: 0,
	avatar: "",
	care_flg: 0,
	uid: 0,
	nick: "",
  is_allow_comment: false,
  is_hide_comment: true,
  is_refresh: false,
  is_top: false
}, action) {
	  let articlelist = state.articlelist;
	  switch (action.type) {
		case ADDARTICLE:
		  return state;
		case TOGGLECARE_FLG:
			if(action.touid == state.uid){
				let care_flg;
				if(state.care_flg) care_flg = 0;
				else care_flg = 1;
				return Object.assign({},state,{
					care_flg: care_flg
				});
			}else{
				return state;
			}
		case SETCURRENTSECTION:
			return Object.assign({},state,{
				coarticlesection: action.sectionid
			});
		case DELARTICLE:
			var aid = action.aid;
			for(let i=0; i<articlelist.length; i++){
				let article = articlelist[i];
				if(article.id == aid){
					articlelist.splice(i,1);
					break;
				}
			}
			return Object.assign({},state,{
				articlelist: articlelist,
				is_refresh: !state.is_refresh
			});
		case CHGISTOP:
			var aid = action.aid;
			for(let i=0; i<articlelist.length; i++){
				let article = articlelist[i];
				if(article.id == aid){
					article.is_top = !article.is_top;
					articlelist[i] = article;
					break;
				}
			}
			return Object.assign({},state,{
				articlelist: articlelist,
				is_refresh: !state.is_refresh
			});
		case GETOARTICLES:
			return Object.assign({},state,{
				oarticles: action.list,
				coarticlesection: state.coarticlesection==0 ? action.list[0].id : state.coarticlesection,
			});
		case GETARTICLEBYADMIN:
		  return Object.assign({},state,{
			id: action.id,
			title: action.title,
			content: action.content,
			desc: action.desc,
			showtime: action.showtime,
			is_allow_comment: action.is_allow_comment,
			is_hide_comment: action.is_hide_comment,
			is_top: action.is_top
		  });
		case GETARTICLE:
		  let inserttime = action.inserttime;
		  let date = inserttime.split(" ")[0];
		  let time = inserttime.split(" ")[1];
		  return Object.assign({},state,{
			id: action.id,
			title: action.title,
			content: action.content,
			commenttimes: action.commenttimes,
			readtimes: action.readtimes,
			is_allow_comment: action.is_allow_comment,
			is_hide_comment: action.is_hide_comment,
			inserttime: date.split("-")[0] + "年" + date.split("-")[1] + "月" + date.split("-")[2] + "日" + " " + time.split(":")[0] + ":" + time.split(":")[1],
			avatar: action.user_avatar,
			uid: action.userid,
			care_flg: action.care_flg,
			nick: action.user_nick,
		  });
		case SETARTICLE:
		return Object.assign({},state,{
		  title: action.title,
		  id: action.id
		});
		case GETARTICLELISTBYAID:
		  return Object.assign({},state,{
			articlelist: action.list
		  });
		case GETFARTICLES:
		  return Object.assign({},state,{
			title: action.title,
			articlelist: action.list
		  });
		case GETARTICLES:
		  return Object.assign({},state, {
					articlelist: action.list
				  });
		default:
		  return state
	  }
}

export default article;
