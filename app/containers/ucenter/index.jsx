'use strict';
require('./less/index.less');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

require('../../components/common/confirm');
import Navbar from '../../components/company/navbar';
import Leftbar from '../../components/company/leftbar';
import Avatar from '../../components/user/info/avatar';
import Nick from '../../components/user/info/nick';
import Qqlogin from '../../components/user/login/qqlogin';
import Wxlogin from '../../components/user/login/wxlogin';
import {
	logout
} from '../../actions/login';
import {
	company_unbind
} from '../../actions/reg';
import {
	getbindflg
} from '../../actions/user';

class Ucenter extends Component {

	componentDidMount(){
		$("[data-toggle='tooltip']").tooltip();
		const {uid,token,dispatch} = this.props;
		getbindflg(uid,token,dispatch);
	}
	
	unbindcompany(){
		const {uid,token,dispatch} = this.props;
	   Ewin.confirm({ message: "解除绑定后，您的账号将不属于该公司，是否继续？" }).on(e => {
	     if (!e) {
	      return;
	     }
			 company_unbind(uid,token,dispatch,function(status){
				 if(status == 200){
					 logout(uid,token);
				 }
			 });
	   });
	}

	render() {
    return (
      <div>
       <Navbar companyid={this.props.companyid} />
			 <div className="ucenter animated zoomIn">
					<Leftbar />
					<div className="right">
						<h2>用户基本信息</h2>
						<form className="form-horizontal" role="form">
							<div className="form-group">
								<label className="col-sm-2 control-label">所属公司</label>
								<div className="col-sm-4">
									<p className="form-control-static">{this.props.companyname}</p>
								</div>
								<div className="col-sm-6">
								{this.props.is_manager=="1" ?
								<p className="form-control-static help-content">无法解除和该公司的绑定？您需要转让管理员或者解散现在公司</p>
								 :
									<Link className="text-danger" data-toggle="tooltip" data-placement="right" title="离职后可点这里解除和该公司的绑定.注意,解除绑定后将失去在该公司的全部资源,谨慎操作!" onClick={this.unbindcompany.bind(this)}>解除绑定</Link>
								}
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">姓名</label>
								<div className="col-sm-4">
									<p className="form-control-static">{this.props.uname}</p>
								</div>
								<div className="col-sm-6">
									<p className="form-control-static help-content">员工姓名由管理员填写</p>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">昵称</label>
								<div className="col-sm-4">
									<p className="form-control-static">{this.props.unick}</p>
								</div>
								<div className="col-sm-6">
									<Link data-toggle="modal" data-target="#nickModal">修改昵称</Link>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">手机号</label>
								<div className="col-sm-4">
									<p className="form-control-static">{this.props.uphone}</p>
								</div>
								<div className="col-sm-6">
									<Link>更改手机号</Link>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">邮箱</label>
								<div className="col-sm-4">
									<p className="form-control-static">{this.props.umail}</p>
								</div>
								<div className="col-sm-6">
									<p className="form-control-static help-content">邮箱由企业管理员设置,您无权修改</p>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">头像</label>
								<div className="col-sm-4">
									<img src={this.props.avatar} width="100" height="100" className="form-control-static" />
								</div>
								<div className="col-sm-6">
									<Link data-toggle="modal" data-target="#avatarModal">上传头像</Link>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">账号绑定</label>
								<div className="col-sm-4">
									<Qqlogin bind_flg={this.props.qq_flg} />
	      					<Wxlogin bind_flg={this.props.wx_flg} />
								</div>
								<div className="col-sm-6">
									<Link data-toggle="modal" data-target="#avatarModal">可使用第三方平台账号直接登录</Link>
								</div>
							</div>							
						</form>
					</div>
					<Avatar />
					<Nick />
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
		companyid: state.login.companyid,
		uname: state.company.uname,
		unick: state.company.unick,
		umail: state.company.umail,
		uphone: state.company.uphone,
		avatar: state.company.avatar,
		companyname: state.company.companyname,
		is_manager: state.company.is_admin,
    	uid: state.login.uid,
		token: state.login.token,
		dd_flg: state.user.dd,
		qq_flg: state.user.qq,
		wx_flg: state.user.wx,
  }
}

export default connect(mapStateToProps)(Ucenter);
