import { server_url } from '../';

import common from '../components/common';

export const TOGGLECARE_FLG = 'togglecareflg';
export const MAKECARE = 'makecare';

export function makecare(touid, uid, token, dispatch, cb) {
    dispatch({
        type: TOGGLECARE_FLG,
        touid: touid
    });
    common.ajax({
        url: server_url + "/careuser.jsp?uid=" + uid + "&token=" + token,
        type: "POST",
        data: {
            touid: touid.toString()
        },
        success: function(status, info, data) {
            if (status == 200) {
                cb();
            }
        }
    });
}