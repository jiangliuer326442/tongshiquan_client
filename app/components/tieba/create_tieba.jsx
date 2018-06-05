'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

require('./less/create_tieba.less');

import {
  addtieba
} from '../../actions/tieba';
class CreateTieba extends Component {
  handleSubmit(){
    const {uid,token,dispatch} = this.props;
    jQuery(".alert-success").hide();
    jQuery(".alert-danger").hide();
    let title = jQuery(this.refs.title).val();
    if(jQuery.trim(title) == ''){
      this.showerror('请填写贴吧名称');
      return;
    }
    if(title.length<3 || title.length>20){
      this.showerror('贴吧名称不合规范');
      return;
    }
    if(!(this.refs.logo.files.length > 0)){
      this.showerror('请上传贴吧LOGO');
      return;
    }
    let desc = jQuery(this.refs.desc).val();
    if(jQuery.trim(desc) == ''){
      this.showerror('需要填写贴吧描述信息');
      return;
    }
    if(desc.length<7 || title.length>70){
      this.showerror('贴吧描述内容不合规范');
      return;
    }
    addtieba(title,this.refs.logo.files[0],desc,uid,token,dispatch,function(status){
      if(status == 200){
        alert("创建贴吧成功");
        window.locatiion.reload();
      }else if(status == 2000){
        alert("您创建的贴吧需要管理员审核，请耐心等待");
      }
      $('#addTieba').modal('hide')
    }.bind(this));
  }

  showerror(msg){
    jQuery(".alert-danger").show();
    jQuery(".alert-danger").text(msg);
  }

  render() {
    return (
      <div className="modal fade" id="addTieba" tabindex="-1" role="dialog" aria-labelledby="addTiebaLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
              <h4 className="modal-title" id="addTiebaLabel">
                创建贴吧
              </h4>
            </div>
            <div className="modal-body">
              <div className="alert alert-success" style={{display:"none"}}>
              </div>
              <div className="alert alert-danger" style={{display:"none"}}>
              </div>
              <form className="form-horizontal" role="form">
                <div className="form-group">
                  <label className="col-sm-2 control-label">贴吧名称</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" ref="title" placeholder="请填写贴吧名称" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label">LOGO</label>
                  <div className="col-sm-10">
                    <input type="file" className="form-control" ref="logo" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label">描述信息</label>
                  <div className="col-sm-10">
                    <textarea className="form-control" ref="desc" placeholder="简单描述一下您创建贴吧的初衷"></textarea>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">放弃
              </button>
              <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>
                创建贴吧
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
		token: state.login.token
  }
}

export default connect(mapStateToProps)(CreateTieba);
