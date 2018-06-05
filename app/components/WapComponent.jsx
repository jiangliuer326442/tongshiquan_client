'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class extends Component {
	constructor(props){
		super(props);
		this.state = {
			dingding_flg: false,
			weixin_flg: false
		};
	}
	
	componentDidMount(){
		if(navigator.userAgent.indexOf("DingTalk") >= 0){
			this.setState({dingding_flg: true});
			$.getScript("http://g.alicdn.com/dingding/open-develop/1.6.9/dingtalk.js",function(){  //加载test.js,成功后，并执行回调函数
				alert(JSON.stringify(dd));
			});
		}
		if(navigator.userAgent.indexOf("Micro") >= 0){
			this.setState({weixin_flg: true});
			$.getScript("http://res.wx.qq.com/open/js/jweixin-1.2.0.js",function(){  //加载test.js,成功后，并执行回调函数
				for(let i in wx){
					alert(wx[i]);
				}
			});
		}
	}
}