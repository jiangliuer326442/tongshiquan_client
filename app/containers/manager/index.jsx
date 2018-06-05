'use strict';
require('./less/manager.less');

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Mask from '../../components/common/mask';
import Navbar from '../../components/company/navbar';
import Header from '../../components/manager/header';

import Guanli from './guanli';
import Renshi from './renshi';
import Gonggao from './gonggao';
import Tieba from './tieba';
import Twitter from './twitter';

import {
	getmycompanyinfo
} from '../../actions/company';
import {
  NAV_5
} from '../../actions/navbar';
import {
  setbigkindid
} from '../../actions/manager';

let current_refid;
let current_refname;

class Manager extends Component {
	
	componentDidMount(){
		const {uid,token,dispatch} = this.props;
		if(this.props.companystartdate == ""){
			getmycompanyinfo(uid,token,dispatch,function(status,info,data){
				
			}.bind(this));
		}
	}
	
  //渲染加载状态
	renderload(){
		return <Mask><img src={require("./img/loading.gif")} style={{margin:"10% 30%"}} /></Mask>
	}
  //切换状态
	setbgimage(event){
		if(event.target.getAttribute('data-refid') != current_refid){
			let name;
			for(let i = 0; i < this.props.models.length; i++){
				if(this.props.models[i].id == event.target.getAttribute('data-refid')){
					name = this.props.models[i].name;
					break;
				}
			}
			if(event.target.getAttribute('data-refid') == 0){
				name = "管理";
			}
        	let background_image;
			if(name == "管理"){
        		background_image = "guanli";
        	}else if(name == "人事"){
        		background_image = "renshi";
        	}else if(name == "公告"){
        		background_image = "gonggao";
        	}else if(name == "贴吧"){
        		background_image = "tieba";
        	}else if(name == "空间"){
        		background_image = "kongjian";
        	}
			if(jQuery(event.target).hasClass(background_image+"_on")){
				jQuery(event.target).removeClass(background_image+"_on");
			}else{
				jQuery(event.target).addClass(background_image+"_on");
			}
		}
	}
	//设置当前选中的状态
	setcurrent(event){
		if(event.target.getAttribute('data-refid') != current_refid){
			let current_refid11 = event.target.getAttribute('data-refid'),
      current_refname = "";
			if(current_refid11 > 0){
				for(let i = 0; i < this.props.models.length; i++){
					if(this.props.models[i].id == current_refid11){
						current_refname = this.props.models[i].name;
						break;
					}
				}
			}else{
				current_refname = "管理";
			}
      this.props.dispatch(setbigkindid(current_refid11, current_refname));
		}
	}
  render() {
    let isloading = this.props.models.length>0?false:true;
    if(!isloading){
      let current_refid2 = this.props.current_refid;
      if(current_refid2 == 0 && this.props.is_manager != "1"){
        //尚未初始化，给予初始化
        current_refid = this.props.models[0].id.toString();
        current_refname = this.props.models[0].name;
      }else{
        current_refid = this.props.current_refid;
        current_refname = this.props.current_refname;
      }
    }
    return (
      <div>
        <Navbar nav_default={NAV_5} companyid={this.props.companyid} />
        {isloading ? this.renderload():
          <div className="admintree">
    			{/*左侧主分类*/}
    				<div className="left">
    				{this.props.is_manager=="1" ?
    					<div className={"item guanli"+(current_refid==0 ? " guanli_on":"")} data-refid="0" onClick={this.setcurrent.bind(this)} onMouseOver={this.setbgimage.bind(this)} onMouseOut={this.setbgimage.bind(this)}>
    						管理
    					</div>
    				:null}
            {this.props.models.map(function(model) {
            	var background_image = "";
            	if(model.name == "人事"){
            		background_image = "renshi";
            	}else if(model.name == "公告"){
            		background_image = "gonggao";
            	}else if(model.name == "贴吧"){
            		background_image = "tieba";
            	}else if(model.name == "空间"){
            		background_image = "kongjian";
            	}
               return 	<div key={model.name} data-refid={model.id} className={"item"+" "+background_image+(current_refid==model.id ? " "+background_image+"_on":"")} onClick={this.setcurrent.bind(this)} onMouseOver={this.setbgimage.bind(this)} onMouseOut={this.setbgimage.bind(this)}>
    						{model.name}
    					</div>
            }, this)}
            </div>
            {current_refid==0 ? <Guanli /> : null}
            {current_refname=="人事" ? <Renshi /> : null}
            {current_refname=="公告" ? <Gonggao refid={current_refid} /> : null}
			{current_refname=="贴吧" ? <Tieba refid={current_refid} /> : null}
            {current_refname=="空间" ? <Twitter refid={current_refid} /> : null}
    				{this.props.current_selected == 0 && this.props.is_manager == "1" ? 
    					<div className="companyinfo_box">
    						<Header title="公司信息" />
    						<div className="admin_form">
    							<div className="keyno">NO: {this.props.companyno}</div>
    							<div className="companyname">{this.props.companyname}</div>
    							<div className="owner">{this.props.companyopername}</div>
    							<div className="startdate">{this.props.companystartdate}</div>
    						</div>
    					</div>
    				: null}
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
    companyid: state.login.companyid,
    models: state.company.models,
    is_manager: state.company.is_admin,
    current_refid: state.managernav.current_refid,
    current_refname: state.managernav.current_refname,
    current_selected: state.managernav.current_selected,
    companyname: state.company.companyname,
    companyno: state.company.companyno,
    companyopername: state.company.companyopername,
    companystartdate: state.company.companystartdate,
    companylogo: state.company.companylogo,
  }
}

export default connect(mapStateToProps)(Manager);
