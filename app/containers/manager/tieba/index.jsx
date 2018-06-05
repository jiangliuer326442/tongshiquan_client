'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Approval from './approval';
import ApprovalDetail from './approvaldetail';
import Settings from './settings';
import CommentList from '../gonggao/commentlist';
import List from '../gonggao/list';

import {
  setsmallkindid,
  getsmallkindlist
} from '../../../actions/manager';

let current_selected;

 class Tieba extends Component {
	setbgimage(event){
		if(event.target.getAttribute('data-id') != this.props.current_selected){
			jQuery(event.target).toggleClass("current");
		}
	}
	componentDidMount(){
		getsmallkindlist(this.props.refid,this.props.uid,this.props.token,this.props.dispatch);
		jQuery(".midkind").mouseover(function(event){
			this.setbgimage(event);
		}.bind(this)).mouseout(function(event){
			this.setbgimage(event);
		}.bind(this));
	}
  //设置当前选中的状态
	setcurrent(event){
		if(event.target.getAttribute('data-id') != this.props.current_selected){
			this.props.dispatch(setsmallkindid(event.target.getAttribute('data-id')));
		}
	}
  //获取模块大分类的管理员
  getladerid(){
    let leaderid;
    for(let i=0; i<this.props.models.length; i++){
      if(this.props.models[i].id == this.props.refid){
        leaderid = this.props.models[i].leaderid;
      }
    }
    return leaderid;
  }
	render(){
    let leaderid = this.getladerid();
    current_selected = this.props.current_selected;
    if(this.props.list.length > 0){
      let current_selected2 = this.props.current_selected;
      if(current_selected2 == 1 && this.props.uid != leaderid){
        //尚未初始化，给予初始化
        current_selected = this.props.list[0].id.toString()+"1";
      }
    }
		return (
			<div style={{display: "flex",flexGrow:"1"}}>
				<div className="admingroups">
						{leaderid == this.props.uid ?
						  <div style={{display:"flex",flexDirection:"column", alignItems: "center",width: "100%"}}>
								<h3>创建贴吧</h3>
								<ul>
									<li data-id="1" onClick={this.setcurrent.bind(this)} className={"midkind"+(this.props.current_selected==1 ? " current":"")}>申请列表</li>
								</ul>
							</div>
              :null
            }
            {this.props.list.map(function(section) {
               return 	<div style={{display:"flex",flexDirection:"column", alignItems: "center",width: "100%"}} key={section.id}>
						  <h3>{section.name}</h3>
						  <ul>
							<li data-id={section.id+"2"} onClick={this.setcurrent.bind(this)} className={"midkind"+(current_selected==section.id+"2" ? " current":"")}>贴吧设置</li>
							<li data-id={section.id+"4"} onClick={this.setcurrent.bind(this)} className={"midkind"+(current_selected==section.id+"4" ? " current":"")}>帖子列表</li>
						  </ul>
						</div>
            }, this)}	
				</div>
				{current_selected == 1 ? <Approval /> : null }
				{current_selected == 5 ? <ApprovalDetail /> : null }
				{current_selected == 6 ? <CommentList /> : null }
				{current_selected.toString().substr(current_selected.toString().length - 1, 1) == 2 ? <Settings refid={current_selected.toString().substr(0, current_selected.toString().length - 1)} /> : null}
				{current_selected.toString().substr(current_selected.toString().length - 1, 1) == 4 ? <List refid={current_selected.toString().substr(0, current_selected.toString().length - 1)} /> : null}
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
    current_selected: state.managernav.current_selected,
		list: state.managernav.section_list,
		models: state.company.models
  }
}

export default connect(mapStateToProps)(Tieba);
