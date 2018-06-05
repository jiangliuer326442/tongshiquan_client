'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Header from '../../../components/manager/header';
import common from '../../../components/common';

import {
	getemptwt,
  delemptwt
} from '../../../actions/twitter';
import {
  setsmallkindid
} from '../../../actions/manager';

class List extends Component {
	
	componentDidMount(){
		const {uid,token,dispatch} = this.props;
		getemptwt(this.props.page,20,uid,token,dispatch,()=> {});
	}

  handleDel(index, id){
    const {uid,token,dispatch} = this.props;
    delemptwt(index, id, uid, token, dispatch, ()=> {
      getemptwt(this.props.page,20,uid,token,dispatch,()=> {});
    });
  }
	
  render(){
   return (
   <div style={{height: "100%", backgroundColor:"#fff"}}>
     <div style={{display:"flex",flexDirection:"column",height: "100%",padding:"22px 27px",border:"1px solid #ccc",width:"800px",borderRightWidth:"0px"}}>
       <Header title="说说列表" />
       <div className="admin_form">
         <table className="table table-striped table-hover">
         	<thead>
         		<tr>
         			<th style={{maxWidth:"300px"}}>分享内容</th>
         			<th>员工</th>
              <th>发布时间</th>
              <th>操作</th>
         		</tr>
         	</thead>
         	<tbody>
          {
            this.props.list.map((item, index) => {
              return <tr>
												<td style={{maxWidth:"300px"}}>{item.content}</td>
                        <td>{item.user_name}</td>
                        <td>{item.create_time}</td>
                        <th>
                          <Link onClick={this.handleDel.bind(this, index, item.id)}>删除</Link>
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
		list: state.twitter.twitter_list,
    page: state.twitter.page,
    fresh_flg: state.twitter.fresh_flg,
  }
}

export default connect(mapStateToProps)(List);
