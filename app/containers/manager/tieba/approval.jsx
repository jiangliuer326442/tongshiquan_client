'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Header from '../../../components/manager/header';
import common from '../../../components/common';

import {
	lstiebaapprov,
	gttiebaapprov
} from '../../../actions/tieba';
import {
  setsmallkindid
} from '../../../actions/manager';

class Approval extends Component {
	
	componentDidMount(){
		const {uid,token,dispatch} = this.props;
		lstiebaapprov(uid,token,dispatch);
	}
	
	setApprov(apprvid){
		const {dispatch} = this.props;
		gttiebaapprov(apprvid,dispatch,function(){
			dispatch(setsmallkindid(5));
		}.bind(this));
	}
	
  render(){
   return (
   <div style={{height: "100%", backgroundColor:"#fff"}}>
     <div style={{display:"flex",flexDirection:"column",height: "100%",padding:"22px 27px",border:"1px solid #ccc",width:"800px",borderRightWidth:"0px"}}>
       <Header title="申请列表" />
       <div className="admin_form">
         <table className="table table-striped table-hover">
         	<thead>
         		<tr>
         			<th>ID</th>
         			<th>名称</th>
         			<th>LOGO</th>
              <th>描述</th>
              <th>申请人</th>
              <th>申请时间</th>
              <th>操作</th>
         		</tr>
         	</thead>
         	<tbody>
          {
            this.props.list.map((item, index) => {
              return <tr>
												<td>{item.id}</td>
												<td width="100" title={item.title}>{common.trim(item.title,14,true)}</td>
												<td><img src={item.logo} width="50" height="50" /></td>
												<td width="200" title={item.desc}>{common.trim(item.desc,24,true)}</td>
												<td>{item.user_name}</td>
												<td>{common.trim(item.create_time,10)}</td>
												<td>
													<Link className="btn btn-info" href="javascript:;" onClick={this.setApprov.bind(this,item.id)} role="button" style={{textShadow: "black 5px 3px 3px"}}>
														<span className="glyphicon glyphicon-edit"></span>
														详细
													</Link>
												</td>
                     </tr>
            })
          }
         	</tbody>
         	</table>
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
		list: state.tieba.appvlist
  }
}

export default connect(mapStateToProps)(Approval);
