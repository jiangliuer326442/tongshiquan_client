export const NAVINDEX = 'nav_index';
export const NAV_1 = 'nav_qiyeluntan';
export const NAV_2 = 'nav_tongshiquan';
export const NAV_3 = 'nav_tongxunlu';
export const NAV_4 = 'nav_wodetieba';
export const NAV_5 = 'nav_guanlizhongxin';

/**
 * 设置nav导航信息
 */
export function setnav(navindex){
  return {
    type: NAVINDEX,
    navindex
  }
}
