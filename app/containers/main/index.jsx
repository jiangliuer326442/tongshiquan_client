'use strict';

import WAPMain from './wap.jsx';
import PCMain from './pc.jsx';

var ua = navigator.userAgent;
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
isAndroid = ua.match(/(Android)\s+([\d.]+)/),
isMobile = isIphone || isAndroid;

//判断

if(isMobile){
	var obj = WAPMain;
}else{
	var obj = PCMain;
}

export default obj;
