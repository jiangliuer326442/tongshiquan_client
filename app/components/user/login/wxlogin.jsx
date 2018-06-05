import React, { Component } from 'react';
import { connect } from 'react-redux';

require('./less/third_login.less');

import {
	wx_bind,
  wx_login,
	receive_login,
	receive_openid
} from '../../../actions/login';

class Wxlogin extends Component {
	
  componentDidMount(){
  	if(typeof(this.props.bind_flg)!="undefined"){
  		receive_openid(this.props.uid,this.props.token,this.props.dispatch);
  	}else{
    	receive_login(this.props.dispatch);
   	}
  }
	
  handleClick(){
  	if(typeof(this.props.bind_flg)!="undefined" && this.props.bind_flg==false){
  		//绑定账号
  		wx_bind();
  	}else if(typeof(this.props.bind_flg)=="undefined"){
  		wx_login();
  	}
  }
	
  render() {
  	let title;
  	if(typeof(this.props.bind_flg)!="undefined"){
  		if(this.props.bind_flg == false){
  			title = "点击绑定微信";
  		}else{
  			title = "该账号已绑定微信";
  		}
  	}else{
  		title="";
  	}
    return (
    	<i title={title} onClick={this.handleClick.bind(this)} className={"thirdlogin clubfriends icon--dengluweixin"+(typeof(this.props.bind_flg)!="undefined" && this.props.bind_flg==false?" disabled":"")}></i>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(Wxlogin);