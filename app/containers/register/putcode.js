'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { history} from '../../';

import {
	send_register
} from '../../actions/reglog';

class PutCode extends Component {
	constructor(props){
		super(props);
		this.state = {
			codelength: 4,
			codes: "",
			isreg_flg: false,
		}
	}

	componentWillMount(){
		window.addEventListener('resize', function() {
			if(document.documentElement.clientHeight<500){
				if(mui(".reglogin .subtitle").length>0){
					mui(".reglogin .subtitle")[0].style.display = "none";
				}
			}else{
				if(mui(".reglogin .subtitle").length>0){
					mui(".reglogin .subtitle")[0].style.display = "block";
				}
			}
		}, false);
	}

	componentDidMount(){
		require("./less/register.less");
		this.focus(0);
		this.bindEvent();
	}
	
	bindEvent(){
		mui(".putcode").on('tap','.btn', this.handleReg.bind(this));
	}

	handleReg(){
		if(!mui(this.refs.regbtn).hasClass("btngray")){
			if(!this.state.isreg_flg){
				this.state.isreg_flg = true;
				send_register(this.props.companyid, this.props.phone, this.state.codes, this.props.password, function(status,info,data){
					  if(status == 200){
						window.location.href = "http://www.companyclub.cn/downloadapp?_s=waplogin";
					  }else{
						mui.toast(info);
					  }
					  this.state.isreg_flg = false;
				}.bind(this))
			}
		}
	}

	handleChange(i,event){
		var no = event.target.value;
		var codes = this.state.codes;
		if(no.length>0){
			if(no>9){
				codes = codes.substr(0,i);
				no= no.substr(1);
				mui(event.target)[0].value = no;
			}
			if(i+1<this.state.codelength){
				this.focus(i+1);
			}
			codes+=no;
		}else{
			if(i>0){
				this.focus(i-1);
			}
			codes = codes.substr(0,i);
		}
		this.setState({codes: codes});
	}
	
	rendercodes(){
		var codes = [];
		for( var i = 0; i < this.state.codelength; i++ ){
			codes.push(<input key={i} type="number" onChange={this.handleChange.bind(this, i)} length="1" />);
		}
		return codes;
	}
	
	focus(t){
		for(var i=0; i<this.state.codelength; i++){
			mui(".codesgroup input")[i].classList.remove("focus");
		}
		mui(".codesgroup input")[t].classList.add("focus");
		mui(".codesgroup input")[t].focus();
	}
	
	replacephoneno(phone){
		var result = "";
		for(var i=0; i<phone.length; i++){
			result += phone[i];
			if(i==2 || i==6){
				result += " ";
			}
		}
		return result;
	}
	
  render() {
    return (
		<div className="reglogin putcode">
			<div className="head">
				<img onClick={function(){mui.back()}} className="return" src={require("./img/return.png")} />
			</div>
			<h2 className="title">输入验证码</h2>
			<p className="subtitle">验证码已经发送到<i>{this.replacephoneno(this.props.phone)}</i></p>
			<div className="codesgroup">
				{this.rendercodes()}
			</div>
			<button ref="regbtn" className={this.state.codes.length==this.state.codelength?"btn":"btn btngray"} type="mutton">完成注册</button>
		</div>
    )
  }
}

function mapStateToProps(state) {
  return {
	companyid: state.reglog.selected_company,
	phone: state.reglog.phone,
	password: state.reglog.password,
  }
}

export default connect(mapStateToProps)(PutCode);
