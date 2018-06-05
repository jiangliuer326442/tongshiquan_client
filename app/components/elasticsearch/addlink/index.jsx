'use strict';

import {
  addconnect,
  delconnact
} from '../../../actions/elastic';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Addlink extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: props.name
      };
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      name: nextProps.name,
      host: nextProps.host,
      port: nextProps.port,
      user: nextProps.user,
      pass: nextProps.pass
    });
  }
  showerror(ref, msg){
    jQuery(".alert-success").hide();
    jQuery(".alert-danger").show();
    jQuery(".alert-danger").text(msg);
    jQuery(this.refs[ref]).addClass("error");
  }
  showsuccess(msg){
    jQuery(".alert-success").show();
    jQuery(".alert-danger").hide();
    jQuery(".alert-success").text(msg);
    jQuery("#addlink form .error").removeClass("error");
  }
  initmsgbox(){
    jQuery(".alert-success").hide();
    jQuery(".alert-danger").hide();
    this.refs.linkname.value = "";
    this.refs.hostname.value = "";
    this.refs.username.value = "";
    this.refs.password.value = "";
  }
  addLink(){
    const {dispatch} = this.props;
	  let linkname = this.refs.linkname.value;
    if(jQuery.trim(linkname) == ''){
      this.showerror('linkname','连接名称必填');
      return;
    }
  	for(let i=0; i< this.props.link_arr.length; i++){
  		if(this.props.link_arr[i].name == linkname){
  		  this.showerror('linkname','该连接名已存在，请更换一个');
  		  return;
  		}
  	}
	  let hostname = this.refs.hostname.value;
    if(jQuery.trim(hostname) == ''){
      this.showerror('hostname','主机必填');
      return;
    }
	  let port = this.refs.port.value;
    if(jQuery.trim(port) == ''){
      this.showerror('port','端口号必填');
      return;
    }
    let username = this.refs.username.value;
    if(jQuery.trim(username) == ''){
      this.showerror('username','用户名必填');
      return;
    }
    let password = this.refs.password.value;
    if(jQuery.trim(password) == ''){
      this.showerror('password','密码必填');
      return;
    }
    if(this.props.name){
      addconnect(linkname,hostname,port,username,password,dispatch,function(status){
        if(status == 200){
          delconnact(this.props.name, dispatch);
          this.initmsgbox();
          $('#addlink').modal('hide');
        }else{
          this.showerror('password','用户名或密码错误');
        }
      }.bind(this));
    }else{
      addconnect(linkname,hostname,port,username,password,this.props.dispatch,function(status){
        if(status == 200){
          this.initmsgbox();
          $('#addlink').modal('hide');
        }else{
          this.showerror('password','用户名或密码错误');
        }
      }.bind(this));
    }
  }

  render() {
    return (
		<div className="modal fade" id="addlink" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal"
								aria-hidden="true">×
						</button>
						<h4 className="modal-title">
							{this.props.name ? "修改连接" : "新建连接"}
						</h4>
					</div>
					<div className="modal-body">
						<form className="form-horizontal" role="form">
              <div className="alert alert-success" style={{display:"none"}}></div>
  						<div className="alert alert-danger" style={{display:"none"}}></div>
						  <div className="form-group">
							<label className="col-sm-4 control-label">连接名：</label>
							<div className="col-sm-8">
							  <input type="text" className="form-control" ref="linkname" value={this.state.name} onChange={(event)=>{this.setState({name: event.target.value})}} />
							</div>
						  </div>
						  <div className="form-group">
							<label className="col-sm-4 control-label">主机名或IP地址</label>
							<div className="col-sm-8">
							  <input type="text" className="form-control hostname" ref="hostname" value={this.state.host} onChange={(event)=>{this.setState({host: event.target.value})}} />
							</div>
						  </div>
						  <div className="form-group">
							<label className="col-sm-4 control-label">端口：</label>
							<div className="col-sm-8">
							  <input type="number" className="form-control" ref="port" value={this.state.port} onChange={(event)=>{this.setState({port: event.target.value})}} />
							</div>
						  </div>
						  <div className="form-group">
							<label className="col-sm-4 control-label">用户名：</label>
							<div className="col-sm-8">
							  <input type="text" className="form-control" ref="username" value={this.state.user} onChange={(event)=>{this.setState({user: event.target.value})}} />
							</div>
						  </div>
						  <div className="form-group">
							<label className="col-sm-4 control-label">密码：</label>
							<div className="col-sm-8">
							  <input type="password" className="form-control" ref="password" value={this.state.pass} onChange={(event)=>{this.setState({pass: event.target.value})}} />
							</div>
						  </div>
						</form>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-default"
								data-dismiss="modal">关闭
						</button>
						<button onClick={this.addLink.bind(this)} type="button" className="btn btn-primary">
							确定
						</button>
					</div>
				</div>
			</div>
		</div>
    );
  }
}

function mapStateToProps(state) {
	return {
	  link_arr: state.elastic.link_arr,
    name: state.elastic.current_linkname,
    host: state.elastic.current_linkhost,
    port: state.elastic.current_linkport,
    user: state.elastic.current_linkuser,
    pass: state.elastic.current_linkpass
	}
}

export default connect(mapStateToProps)(Addlink);
