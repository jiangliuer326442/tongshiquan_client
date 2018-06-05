'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

require('./less/index.less');

import common from '../../components/common';
import Navbar from '../../components/company/navbar';
import Leftbar from '../../components/company/leftbar';

import {
  NAV_4
} from '../../actions/navbar';
import {
	getmycomments
} from '../../actions/comment';

class Myreply extends Component {
	
	componentDidMount(){
		const {uid,token,dispatch} = this.props;
		getmycomments(uid,token,dispatch,function(){});
	}

  render() {
    return (
      <div>
        <Navbar nav_default={NAV_4} companyid={this.props.companyid} />
        <div className="myreply">
					<Leftbar />
					<div className="right">
							<table className="table">
								<thead>
									<tr>
										<th style={{maxWidth:"200px",overflow:"hidden"}}>评论</th>
										<th>文章</th>
										<th>发表时间</th>
										<th>评论数量</th>
									</tr>
								</thead>
								<tbody>
{
	this.props.mycomments.map((item,index)=>{
		return (
									<tr key={item.id}>
										<td style={{maxWidth:"200px",overflow:"hidden"}} dangerouslySetInnerHTML={{__html: item.comment}}></td>
										<td><Link to={"/post/"+this.props.companyid+"/"+item.article_id}>{common.trim(item.title, 30, true)}</Link></td>
										<td>{item.inserttime.split(" ")[0]}</td>
										<td>{item.commenttimes}</td>
									</tr>
		)
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
		companyid: state.login.companyid,
		mycomments: state.comment.mycomments
  }
}

export default connect(mapStateToProps)(Myreply);
