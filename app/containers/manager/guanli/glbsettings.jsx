'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toast from '../../../components/common/toast';
import Header from '../../../components/manager/header';

import {
  getglbsetting,
  setglbsetting
} from '../../../actions/company';

class Glosettings extends Component {
 componentDidMount(){
   getglbsetting(this.props.uid,this.props.token,this.props.dispatch);
 }
 handleSubmit(){
   let btime = parseInt(jQuery(this.refs.btime).val());
   let etime = parseInt(jQuery(this.refs.etime).val());
   if(btime >= etime){
     this.showerror("btime","开始时间必须小于结束时间");
     return;
   }
   jQuery(this.refs.btn).button('loading');
   setglbsetting(this.refs.logo.files.length > 0 ? this.refs.logo.files[0]:this.props.logo, btime+"||"+etime, jQuery('input[name="is_allowregister"]:checked ').val(), jQuery('input[name="is_allowvisit"]:checked ').val(), jQuery('input[name="is_postbar_audit"]:checked ').val(), this.props.uid, this.props.token, this.props.dispatch, () => {
     new Toast({message:"操作成功"}).show();
     jQuery(this.refs.btn).button('reset');
	 var file = $(this.refs.logo) ;
	 file.after(file.clone().val(""));
	 file.remove();
   });
 }
 showerror(ref, msg){
   new Toast({message:msg}).show();
   jQuery(this.refs[ref+"_msg"]).html("<font color='red'>"+msg+"</font>");
   jQuery(this.refs[ref]).css("border-color","red");
 }
 render(){
     let hours = []
     for (let i = 0; i < 24; i++){
         hours.push(<option key={i} value={i}>{i}</option>)
     }
   return (
   <div style={{height: "100%", backgroundColor:"#fff"}}>
     {this.props.isloading ? null:
     <div style={{display:"flex",flexDirection:"column",height: "100%",padding:"22px 27px",border:"1px solid #ccc",width:"800px",borderRightWidth:"0px"}}>
       <Header title="全局设置" />
       <div className="admin_form">
         <label>企业logo
			<i ref="logo_msg" style={{marginLeft:"5px"}}>
			{this.props.logo!=""?
				<img src={this.props.logo} />
			:null}
			</i>
		 </label>
         <div className="row">
           <div className="input_area">
             <input type="file" ref="logo" />
           </div>
           <p>贵公司的LOGO图片,显示在网页左上角,默认显示公司名称</p>
         </div>

         <label>是否开放注册</label>
         <div className="row">
{this.props.is_allow_register === true || this.props.is_allow_register=="1" ?
           <div className="input_area">
             <input type="radio" name="is_allowregister" value="1" defaultChecked="checked" />是
             <input type="radio" name="is_allowregister" value="0" />否
           </div>
:
           <div className="input_area">
             <input type="radio" name="is_allowregister" value="1" />是
             <input type="radio" name="is_allowregister" value="0" defaultChecked="checked" />否
           </div>
}
           <p>当前任何人都可以注册加入该公司，<br />若不开放注册，只有管理员添加的员工才能通过验证手机号加入</p>
         </div>

         <label>员工创建贴吧是否需要审核</label>
         <div className="row">
{this.props.is_postbar_audit === true || this.props.is_postbar_audit=="1" ?
           <div className="input_area">
             <input type="radio" name="is_postbar_audit" value="1" defaultChecked="checked" />是
             <input type="radio" name="is_postbar_audit" value="0" />否
           </div>
:
           <div className="input_area">
             <input type="radio" name="is_postbar_audit" value="1" />是
             <input type="radio" name="is_postbar_audit" value="0" defaultChecked="checked" />否
           </div>
}
           <p>若选择是,员工创建贴吧需要得到管理员的同意</p>
         </div>

         <label>是否对外开放</label>
         <div className="row">
{this.props.is_allowvisit === true || this.props.is_allowvisit=="1" ?
           <div className="input_area">
             <input type="radio" name="is_allowvisit" value="1" defaultChecked="checked" />是
             <input type="radio" name="is_allowvisit" value="0" />否
           </div>
:
           <div className="input_area">
             <input type="radio" name="is_allowvisit" value="1" />是
             <input type="radio" name="is_allowvisit" value="0" defaultChecked="checked" />否
           </div>
}
           <p>是否允许非本公司的人员通过URL链接访问论坛</p>
         </div>

         <label>论坛允许访问的时间	<i ref="btime_msg"></i></label>
         <div className="row">
           <div className="input_area">
             <select ref="btime" defaultValue={this.props.allow_visit_time.split('||')[0]}>
               {hours}
             </select>
             点到
             <select ref="etime" style={{marginLeft:"10px"}} defaultValue={this.props.allow_visit_time.split('||')[1]}>
               {hours}
             </select>
             点
           </div>
           <p>只有在这段时间里,才能够访问论坛</p>
         </div>
         <button ref="btn" onClick={this.handleSubmit.bind(this)} type="button" className="btn btn-info" style={{width:"80px", alignSelf:"center"}} data-loading-text="正在保存">保存</button>
       </div>
     </div>
     }
   </div>
   );
 }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
    isloading: state.company.isloading,
    allow_visit_time: state.company.allow_visit_time,
    is_allow_register: state.company.is_allow_register,
    is_postbar_audit: state.company.is_postbar_audit,
    is_allowvisit: state.company.is_allowvisit,
    logo: state.company.companylogo
  }
}

export default connect(mapStateToProps)(Glosettings);
