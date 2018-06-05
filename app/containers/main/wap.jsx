'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { history} from '../../';

import {
    setcompany,
	base64decode,
	SENDREGCODE
} from "../../actions/reglog";

class WAPMain extends Component {

	componentDidMount(){
		require("./less/wap.less");
		this.bindEvent();
	}

	bindEvent(){
		mui(".main").on('tap','.btnregister', this.handleRegister.bind(this));
		mui(".main").on('tap','.btnlogin', function(){
			window.location.href = "http://www.companyclub.cn/downloadapp?_s=waplogin";
		});
	}

	handleRegister(){
		var companyid = this.props.location.query.companyid;
		var phone = this.props.location.query.phone;
		if(typeof(companyid) != "undefined"){
			setcompany(companyid,this.props.dispatch);
			history.push('/reg/putphone');
		}else if(typeof(phone) != "undefined"){
			phone = base64decode(phone);
			this.props.dispatch({ 
		        type: SENDREGCODE,
		        phone: phone,
		        password: phone,
			});
			history.push('/reg/putcompany');
		}else{
			history.push('/reg/putcompany');
		}
	}

	render(){
		return (
			<div className="main">
				{/**登录按钮**/}
				<input type="button" className="btn btnlogin" value="登录" />
				{/**注册按钮**/}
				<input type="button" className="btn btnregister" value="注册" />
			</div>
		)
	}
}

export default connect()(WAPMain);
