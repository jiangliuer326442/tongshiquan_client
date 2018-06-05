import React, { Component } from 'react';
import { connect } from 'react-redux';

require('./less/third_login.less');

import {
	dd_bind,
  dd_login,
  receive_login,
  receive_openid
} from '../../../actions/login';

class Ddlogin extends Component {
	
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
  		dd_bind();
  	}else if(typeof(this.props.bind_flg)=="undefined"){
  		dd_login();
  	}
  }
	
  render() {
  	let title;
  	if(typeof(this.props.bind_flg)!="undefined"){
  		if(this.props.bind_flg == false){
  			title = "点击绑定叮叮";
  		}else{
  			title = "该账号已绑定叮叮";
  		}
  	}else{
  		title="";
  	}
  	
    return (
    	<i title={title} onClick={this.handleClick.bind(this)} className={"thirdlogin clubfriends icon--dingding1"+(typeof(this.props.bind_flg)!="undefined" && this.props.bind_flg==false?" disabled":"")}></i>
    );
  }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
  }
}

export default connect(mapStateToProps)(Ddlogin);