'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../../components/manager/header';

import {
  getdepartment,
  setdepartment
} from '../../../actions/department';

class Adddepartment extends Component {
 componentDidMount(){
   getdepartment(this.props.uid,this.props.token,this.props.dispatch);
 }
 showerror(ref, msg){
   jQuery(this.refs[ref+"_msg"]).html("<font color='red'>"+msg+"</font>");
   jQuery(this.refs[ref]).css("border-color","red");
 }
 handleSubmit(){
   let department_name = jQuery(this.refs.name).val();
   if(jQuery.trim(department_name) == ''){
     this.showerror('name','部门名称不能为空');
     return;
   }
   let superid = jQuery(this.refs.department).val();
   jQuery(this.refs.btn).button('loading');
   setdepartment(department_name, superid, this.props.uid, this.props.token, this.props.dispatch, function(status){
     jQuery(this.refs.btn).button('reset');
     if(status == 200){
       jQuery(this.refs.name).val("");
       getdepartment(this.props.uid,this.props.token,this.props.dispatch);
     }
   }.bind(this));
 }
 render(){
   return (
   <div style={{height: "100%", backgroundColor:"#fff"}}>
     <div style={{display:"flex",flexDirection:"column",height: "100%",padding:"22px 27px",border:"1px solid #ccc",width:"800px",borderRightWidth:"0px"}}>
       <Header title="添加部门" />
       <div className="admin_form">
         <label>部门名称 <i ref="name_msg"></i></label>
         <div className="row">
           <div className="input_area">
             <input type="text" ref="name" placeholder="部门名称" width="250" />
           </div>
           <p></p>
         </div>
         <label>上级部门</label>
         <div className="row">
           <div className="input_area">
             <select ref="department" style={{width:"180px"}}>
               <option value="0">无上级部门</option>
               {this.props.struct_arr}
             </select>
           </div>
           <p></p>
         </div>
         <button ref="btn" onClick={this.handleSubmit.bind(this)} type="button" className="btn btn-info" style={{width:"80px", alignSelf:"center"}} data-loading-text="正在保存">保存</button>
       </div>
     </div>
   </div>
   );
 }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
    struct_arr: state.department.struct_arr
  }
}

export default connect(mapStateToProps)(Adddepartment);
