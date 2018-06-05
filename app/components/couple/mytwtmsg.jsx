'use strict';

require("./less/twtlist.less");

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Twtitem from './twtitem';
import Toast from '../common/toast';

import {
	getmytwtmsg,
	hidetwt,
} from '../../actions/twitter';

class MyTwtmsglist extends Component {

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
		getmytwtmsg(page, pagenum, uid, token, dispatch, cb);
	}

	render(){
		return (
			<div className="twtlist">
				<div className="title">
					<h3>全部动态</h3>
					<div className="function">
						<i title="刷新动态" onClick={this.refresh_twt.bind(this, 1, (list)=>{if(list.length == 0){this.setState({loadingend_flg: true})}else{this.setState({loadingend_flg: false})}})} className="glyphicon glyphicon-refresh" />
					</div>
				</div>
{this.props.list.map((item, index)=>{
	return(
				<Twtitem source="twtmsg" twtitem={item} twtindex={index} />
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
    page: state.twitter.page,
    pagenum: state.twitter.pagenum,
	fresh_flg: state.twitter.fresh_flg,
  }
}

export default connect(mapStateToProps)(MyTwtmsglist);