'use strict';

require("./less/twtlist.less");

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Twtitem from './twtitem';
import Toast from '../common/toast';

import {
	gettwtlist,
	hidetwt,
	deluserls,
	deldeluser,
} from '../../actions/twitter';

class Twtlist extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	hideuserls_flg: false,//显示隐藏的用户列表
	  	loadingend_flg: false,//加载结束了
	  };
	}

	componentDidMount(){
		this.refresh_twt(1, function(){

		});
		this.scrollloadingmore();
	}

	//滚动加载更多
	scrollloadingmore(){
        $(window).scroll(() =>{
          if($(document).scrollTop()>=$(document).height()-$(window).height()){
          	if(!this.state.loadingend_flg){
	            let page = this.props.page+1;
	            new Toast({message: "数据加载中"}).show();
	            this.refresh_twt(page, (list) =>{
	            	$('.ajax_loading').hide();
	            	if(list.length == 0){
	            		new Toast({message: "没有更多动态了"}).show();
	            		this.state.loadingend_flg = true;
	            	}
	            });
        	}
          }
        })
	}

	componentWillUnmount(){
		$(window).unbind('scroll');
	}

	refresh_twt(page, cb){
		const {uid, token, pagenum, dispatch} = this.props;
		gettwtlist(page, pagenum, uid, token, dispatch, cb);
	}

	toggleUserls(){
		const {uid, token, dispatch} = this.props;
		if(!this.state.hideuserls_flg){
			deluserls(uid, token, dispatch);
		}
		this.setState({hideuserls_flg: !this.state.hideuserls_flg});
	}

	//删除隐藏的用户
	delhideuser(index, tuid){
		const {uid, token, dispatch, pagenum} = this.props;
		deldeluser(index, tuid, uid, token, dispatch, function(){
			gettwtlist(1, pagenum, uid, token, dispatch, function(){});
		});
	}

	render(){
		return (
			<div className="twtlist">
				<div className="title">
					<h3>全部动态</h3>
					<div className="function">
						<i title="刷新动态" onClick={this.refresh_twt.bind(this, 1, (list)=>{if(list.length == 0){this.setState({loadingend_flg: true})}else{this.setState({loadingend_flg: false})}})} className="glyphicon glyphicon-refresh" />
						<i title="动态设置" onClick={this.toggleUserls.bind(this)} className="glyphicon glyphicon-lock" />
					</div>
				</div>
{
	this.props.userlist.length > 0 && this.state.hideuserls_flg ?
				<div className="hideuserls">
	{
		this.props.userlist.map((item, index)=> {
			return (
					<div key={index} onClick={this.delhideuser.bind(this, index, item.tuid)} className="hideuser">
						<span className="username" title={item.nick+"于"+item.addtime+"删除"}>{item.nick}</span>
						<i className="close">×</i>
					</div>
			)
		})
	}
				</div>
	:
	null
}
{this.props.list.map((item, index)=>{
	return(
				<Twtitem source="twtlist" twtitem={item} twtindex={index} />
	)			
})}
			</div>
		)
	}

}

function mapStateToProps(state) {
  return {
	companyid: state.login.companyid,
    uid: state.login.uid,
	token: state.login.token,
	list: state.twitter.twitter_list,
	userlist: state.twitter.hideuser_list,
    page: state.twitter.page,
    pagenum: state.twitter.pagenum,
	fresh_flg: state.twitter.fresh_flg,
  }
}

export default connect(mapStateToProps)(Twtlist);