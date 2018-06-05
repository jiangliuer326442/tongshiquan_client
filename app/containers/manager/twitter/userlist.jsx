'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Header from '../../../components/manager/header';
import common from '../../../components/common';

import {
	gettwtuser,
  disabletwtuser,
  enabletwtuser
} from '../../../actions/twitter';
import {
  setsmallkindid
} from '../../../actions/manager';

class UserList extends Component {
	
	componentDidMount(){ 
		const {uid,token,dispatch} = this.props;
		gettwtuser(this.props.page,20,uid,token,dispatch);
	}

  cannot_speak(index, tuid){
    const {uid,token,dispatch} = this.props;
    disabletwtuser(index, tuid, uid, token, dispatch);
  }

  can_speak(index, tuid){
    const {uid,token,dispatch} = this.props;
    enabletwtuser(index, tuid, uid, token, dispatch);
  }
	
  render(){
   return (
   <div style={{height: "100%", backgroundColor:"#fff"}}>
     <div style={{display:"flex",flexDirection:"column",height: "100%",padding:"22px 27px",border:"1px solid #ccc",width:"800px",borderRightWidth:"0px"}}>
       <Header title="用户管理" />
       <div className="admin_form">
         <table className="table table-striped table-hover">
         	<thead>
         		<tr>
         			<th>员工</th>
              <th>删除次数</th>
              <th>状态</th>
              <th>操作</th>
         		</tr>
         	</thead>
         	<tbody>
          {
            this.props.list.map((item, index) => {
              return <tr>
												<td>{item.user_name}</td>
                        <td>{item.twitter_deltimes}</td>
                        <td>{item.can_speak ? "允许发言":"禁止发言"}</td>
                        <th>
                          {item.can_speak ? 
                          <Link onClick={this.cannot_speak.bind(this,index,item.uid)}>禁止发言</Link>
                            :
                          <Link onClick={this.can_speak.bind(this,index,item.uid)}>允许发言</Link>  
                          }
                        </th>
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
		list: state.twitter.user_list,
    page: state.twitter.page,
    fresh_flg: state.twitter.fresh_flg,
  }
}

export default connect(mapStateToProps)(UserList);
