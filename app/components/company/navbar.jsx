'use strict';
require('./less/navbar.less');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  history
} from '../../';

import common from '../../components/common';

import {
  getcpyinfo,
  getemployeeinfo
} from '../../actions/company';

import {
	innermsg_unreadnum
} from '../../actions/innermsg';

import {
  setnav,
  NAV_1,
  NAV_2,
  NAV_3,
  NAV_4,
  NAV_5
} from '../../actions/navbar';

import {
	logout
} from '../../actions/login';

/**
 * 导航栏组件
 */
class Navbar extends Component {
  componentDidMount(){
    const {dispatch,uid,token} = this.props;
    const companyid = this.props.companyid;
    if(this.props.companyname == ""){
      getcpyinfo(companyid,uid,token,dispatch,function(status,info,data){
        if(status == 200){
          $(document).attr("title",data.Name);
        }else{
        	new common.Toast({message: info}).show();
          logout(uid, token);
        }
      }.bind(this));
    }
    if(this.props.is_admin == null && uid > 0){
      getemployeeinfo(uid,token,dispatch,function(){
      	innermsg_unreadnum(uid,token,dispatch);
			}.bind(this));
    }
  }
	reloadLogo(){
		$(".logo").removeClass("flip");
		setTimeout(function(){
        $(".logo").addClass("flip");
    }, 200);
	}
  render() {
    let nav_index = this.props.nav_index;
    let nav_default = this.props.nav_default;
    if(typeof nav_default != "undefined"){
      nav_index = nav_default;
    }
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
            <div className="container-fluid">
              <div className="navbar-header">
									<button type="button" className="navbar-toggle" data-toggle="collapse"
													data-target="#main-navbar-collapse">
											<span className="sr-only">切换导航</span>
											<span className="icon-bar"></span>
											<span className="icon-bar"></span>
											<span className="icon-bar"></span>
									</button>
                  <Link onMouseEnter={this.reloadLogo.bind(this)} className="navbar-brand logo animated flip hidden-sm" to={"/company/"+this.props.companyid}>
  				{this.props.companylogo!=""?
  				          <img src={this.props.companylogo} className="img-thumbnail img-responsive" style={{margin:"-15px auto",height:"50px",backgroundColor:"transparent"}} />
  				:common.trim(this.props.companyname,16)}
  				        </Link>
              </div>
              <div className="collapse navbar-collapse" id="main-navbar-collapse">
  {this.props.uname ?
                  <ul className="nav navbar-nav">
                      <li className={(nav_index == NAV_1 ? "active " : "")+"animated bounce"}><Link className="nav-item" to={"/company/"+this.props.companyid} onClick={()=> this.props.dispatch(setnav(NAV_1))}>企业论坛</Link></li>
                      <li className={(nav_index == NAV_2 ? "active " : "")+"nav2 animated bounce"}><Link className="nav-item" to="/couple" onClick={()=> this.props.dispatch(setnav(NAV_2))}>同事圈</Link></li>
                      <li className={(nav_index == NAV_3 ? "active " : "")+"nav3 animated bounce"}><Link className="nav-item" to="/chat" target="_blank" onClick={()=> this.props.dispatch(setnav(NAV_3))}>聊天</Link></li>
                      <li className={(nav_index == NAV_4 ? "active " : "")+"nav4 animated bounce"}><Link className="nav-item" to="/myarticle" onClick={()=> this.props.dispatch(setnav(NAV_4))}>我的贴吧</Link></li>
                      {this.props.models.length > 0 ?
											<li className={(nav_index == NAV_5 ? "active " : "")+"nav5 animated bounce"}>
												<Link className="nav-item" to="/manager" target="_blank" onClick={()=> this.props.dispatch(setnav(NAV_5))}>管理中心</Link>
											</li>
                      : null}
                  </ul>
  :
                  <ul className="nav navbar-nav">
                      <li className="active animated bounce"><Link className="nav-item" to={"/company/"+this.props.companyid}>企业论坛</Link></li>
                  </ul>
  }
    {this.props.uname ?
                  <div className="nav navbar-nav navbar-right dropdown hidden-xs">
                    <div className="avatar">
											<img src={this.props.avatar} ref="avatar" className="avatar img-responsive img-circle" alt={this.props.uname} />
										</div>
                    <a href="javascript:;" className="uname animated flash dropdown-toggle" id="user-menu" data-toggle="dropdown"><span>{this.props.uname}</span></a>
										<ul className="dropdown-menu animated bounceInDown" role="menu" aria-labelledby="user-menu">
											<li role="presentation">
												<Link to="/ucenter" role="menuitem" tabIndex="1">账号信息</Link>
											</li>
											<li role="presentation">
												<Link to="/mymsg" role="menuitem" tabIndex="2">站内信{this.props.unreadmsg>0?<span className="badge pull-right" style={{backgroundColor:"red"}}>{this.props.unreadmsg}</span>:null}</Link>
											</li>
											<li role="presentation">
												<Link to="/myattendreply" role="menuitem" tabIndex="3">参与的讨论</Link>
											</li>
											<li role="presentation">
												<Link onClick={()=>logout(this.props.uid,this.props.token)} role="menuitem" tabIndex="3">退出</Link>
											</li>
										</ul>
                  </div>
: null}
              </div>
            </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    nav_index: state.nav.index,
    uid: state.login.uid,
    token: state.login.token,
    companyname: state.company.companyname,
    companylogo: state.company.companylogo,
    is_admin: state.company.is_admin,
    avatar: state.company.avatar,
    uname: state.company.unick,
    models: state.company.models,
    unreadmsg: state.innermsg.unreadnum,
  }
}

export default connect(mapStateToProps)(Navbar);
