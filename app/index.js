import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import configureStore from './stores/configureStore';
import MyRoute from './components/MyRoute';

export const server_url = 'http://api.companyclub.cn';
export const cdn_url = 'http://cdn.companyclub.cn';
export const history = hashHistory;
global.jQuery = $;
if (!Object.assign) {
	// 定义assign方法
  Object.defineProperty(Object, 'assign', {
	enumerable: false,
	configurable: true,
	writable: true,
	value: function(target) { // assign方法的第一个参数
	  'use strict';
	  // 第一个参数为空，则抛错
	  if (target === undefined || target === null) {
		throw new TypeError('Cannot convert first argument to object');
	  }

	  var to = Object(target);
	  // 遍历剩余所有参数
	  for (var i = 1; i < arguments.length; i++) {
		var nextSource = arguments[i];
		// 参数为空，则跳过，继续下一个
		if (nextSource === undefined || nextSource === null) {
		  continue;
		}
		nextSource = Object(nextSource);

		// 获取改参数的所有key值，并遍历
		var keysArray = Object.keys(nextSource);
		for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
		  var nextKey = keysArray[nextIndex];
		  var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
		  // 如果不为空且可枚举，则直接浅拷贝赋值
		  if (desc !== undefined && desc.enumerable) {
			to[nextKey] = nextSource[nextKey];
		  }
		}
	  }
	  return to;
	}
  });
}
/** 
*删除数组指定下标或指定对象 
*/ 
if(!Array.remove){
	Array.prototype.remove=function(obj){ 
		for(var i =0;i <this.length;i++){ 
			var temp = this[i]; 
			if(!isNaN(obj)){ 
				temp=i; 
			} 
			if(temp == obj){ 
				for(var j = i;j <this.length;j++){ 
					this[j]=this[j+1]; 
				} 
				this.length = this.length-1; 
			} 
		} 
	} 
}
/**
 * 获取中文字符串长度
 */
if(!String.gblen){
	String.prototype.gblen = function() {  
		var len = 0;  
		for (var i=0; i<this.length; i++) {  
			if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {  
				 len += 2;  
			 } else {  
				 len ++;  
			 }  
		 }  
		return len;  
	}
}

render(
  <MyRoute />,
  document.getElementById('app')
);
