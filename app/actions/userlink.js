export const SETCARDUSER = 'setcarduser';

export function setcarduser(uid, dispatch){
	dispatch({
		type: SETCARDUSER,
		uid
	});
}