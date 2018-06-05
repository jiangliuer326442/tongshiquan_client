'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../../components/manager/header';
require('../../../components/common/confirm');

import {
  setmanger
} from '../../../actions/admingp';
import {
  getemployeelist
} from '../../../actions/employee';

class Sendadmin extends Component {
  componentDidMount(){
 	 const {refid,uid,token,dispatch} = this.props;
    if(this.props.employee_list.length == 0){
      getemployeelist(uid, token, dispatch);
    }
  }

  handleSubmit(){
    const {refid,uid,token,dispatch} = this.props;
    let manager_id =  jQuery(this.refs.manger_id).val();
    if(manager_id != this.props.uid){
      Ewin.confirm({ message: "变更管理员后您将失去全部管理权限，是否继续？" }).on(e => {
        if (!e) {
         return;
        }
        $(this.refs.btn).button('loading');
        setmanger(manager_id, uid, token, dispatch, () => {
          jQuery(".alert-success").show();
          jQuery(".alert-danger").hide();
          jQuery(".alert-success").text("操作成功");
          $(this.refs.btn).button('reset');
        });
      })
    }else{
      jQuery(".alert-success").hide();
      jQuery(".alert-danger").show();
      jQuery(".alert-danger").text("新超级管理员与原管理员相同");
      $(this.refs.btn).button('reset');
    }
  }

  render(){
    return (
    <div style={{height: "100%", backgroundColor:"#fff"}}>
    {this.props.employee_list.length > 0 ?
      <div style={{display:"flex",flexDirection:"column",height: "100%",padding:"22px 27px",border:"1px solid #ccc",width:"800px",borderRightWidth:"0px"}}>
        <Header title="管理员转让" />
        <div className="admin_form">
          <div className="alert alert-success" style={{display:"none"}}>
          </div>
          <div className="alert alert-danger" style={{display:"none"}}>
          </div>
          <label>模块管理员</label>
          <div className="row">
            <div className="input_area">
              <select ref="manger_id" style={{width:"180px"}} defaultValue={this.props.uid}>
              {
                this.props.employee_list.map((item, index) => {
                  return <option key={index} value={item.userid}>{item.user_name+" ("+item.user_nick+")"}</option>
                })
              }
              </select>
            </div>
            <p></p>
          </div>
          <div style={{display: "flex", flexFlow:"row nowrap", justifyContent:"center"}}>
            <button ref="btn" onClick={this.handleSubmit.bind(this)} type="button" className="btn btn-info" style={{width:"80px"}} data-loading-text="正在保存">保存</button>
          </div>
        </div>
      </div>
    : null}
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
    employee_list: state.employee.list
  }
}

export default connect(mapStateToProps)(Sendadmin);
