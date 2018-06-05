	import CryptoJS from 'crypto-js';
	import common from './';

	var form_key;
	function encrypt(word){
		 var key = CryptoJS.enc.Utf8.parse(form_key);
		 var iv  = CryptoJS.enc.Utf8.parse(form_key);
		 var srcs = CryptoJS.enc.Utf8.parse(word);
		 var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC});
	    return encrypted.toString();
	}
	function decrypt(word){
		 var key = CryptoJS.enc.Utf8.parse(form_key);
		 var iv  = CryptoJS.enc.Utf8.parse(form_key);
		 var srcs = CryptoJS.enc.Utf8.parse(word);
		 var decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv,mode:CryptoJS.mode.CBC});
		 return CryptoJS.enc.utf8.stringify(decrypt).toString();
	}
	//格式化参数
	function formatParams(data, type) {
		if(type == "POST"){
			var formdata = new FormData();
		    for (var name in data) {
		    	if(typeof data[name] == "string"){
                    data[name] = encodeURI(encodeURI(data[name]));
		    		formdata.append(name, encrypt(data[name]));
		    	}else{
		    		formdata.append(name, data[name]);
		    	}
		    }
		    return formdata;
		}else{
			var arr = [];
			for (var name in data) {
				arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
			}
			arr.push(("v=" + Math.random()).replace(".",""));
			return arr.join("&");
		}
	}
	var ajax = function (options) {
		form_key = common.getkey();
	    options = options || {};
	    options.type = (options.type || "GET").toUpperCase();
	    options.dataType = options.dataType || "json";
	    var params = formatParams(options.data, options.type);
	    //创建 - 非IE6 - 第一步
	    if (window.XMLHttpRequest) {
	        var xhr = new XMLHttpRequest();
	    } else { //IE6及其以下版本浏览器
	        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
	    }

	    //接收 - 第三步
	    xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4) {
	            var status = xhr.status;
	            if (status >= 200 && status < 300) {
	            	if(options.dataType == "json"){
	    	            var data = JSON.parse(xhr.responseText);
	    	            options.success && options.success(data.status, data.info, data.data);
	            	}else{
	            		options.success && options.success(xhr.responseText);
	            	}
	            } else {
	                options.fail && options.fail(status);
	            }
	        }
	    }

	    //连接 和 发送 - 第二步
	    if (options.type == "GET") {
	        xhr.open("GET", options.url + (options.url.indexOf('?') >= 0 ? "&":"?") + params, true);
	        xhr.send(null);
	    } else if (options.type == "POST") {
	        xhr.open("POST", options.url + "&k=" + form_key);
	        xhr.send(params);
	    }
	}

	export default ajax;
