import {
  ADDPOST,
	GETALLPOSTS,
  GETPOSTS,
  GETSECTIONPOSTS,
  POSTSETPAGE,
	GETMYPOSTS,
} from '../actions/post';

export default function post(state = {
    list: [],
		num: 0,
    page: 1,
    pagenum: 20,
		myposts: [],
}, action) {
  switch (action.type) {
      case ADDPOST:
        return state;
			case GETMYPOSTS:
        return Object.assign({},state,{
  				myposts: action.list
        });
      case GETALLPOSTS:
        return Object.assign({},state,{
  				list: action.list
        });
      case GETSECTIONPOSTS:
        for(let i=0; i<action.list.length; i++){
            let showtime = action.list[i].showtime;
            action.list[i].showtime = showtime
        }
        return Object.assign({},state,{
          list: action.list,
          num: action.num
        });
      case POSTSETPAGE:
				return Object.assign({},state,{
						page: action.page
				});
      case GETPOSTS:
          for(let i=0; i<action.list.length; i++){
              let inserttime = action.list[i].inserttime.split(" ")[0];
              action.list[i].inserttime = inserttime
          }
          return Object.assign({},state,{
              list: action.list
          });
      default:
          return state
  }
}
