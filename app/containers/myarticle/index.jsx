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
  getmyposts
} from '../../actions/post';
import {
  delarticle
} from '../../actions/article';

class Mymsg extends Component {
	
	componentDidMount(){
		const {uid,token,dispatch} = this.props;
		getmyposts(uid,token,dispatch,function(){});
	}

	//删除自己发表的帖子
	handleDel(postindex, postid, event){
		const {uid,token,dispatch} = this.props;
		$(event.target).parents("tr").fadeOut('slow');
		delarticle(postid, uid, token, dispatch, ()=>{
			()=>$(event.target).parents("tr").remove();
		});
	}

  render() {
    return (
      <div>
        <Navbar nav_default={NAV_4} companyid={this.props.companyid} />
        <div className="myarticle">
					<Leftbar />
					<div className="right">
						<div className="table-responsive">
							<table className="table">
								<thead>
									<tr>
										<th>标题</th>
										<th>所属板块</th>
										<th>发表时间</th>
										<th>浏览回复</th>
										<th>最后回复</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody>
{
	this.props.myposts.map((item,index)=>{
		return (
			<tr key={item.id}>
				<td><Link to={"/post/"+this.props.companyid+"/"+item.sectionid} target="_blank">{common.trim(item.title,20,true)}</Link></td>
				<td><Link to={"/posts/"+this.props.companyid+"/"+item.sectionid} target="_blank">{item.sectionname}</Link></td>
				<td>{item.inserttime.split(" ")[0]}</td>
				<td>{item.readtimes}/{item.commenttimes}</td>
				<td>
				{
					typeof(item.comment)!="undefined" ? 
					<Link to={"/post/"+this.props.companyid+"/"+item.sectionid+"#comment"+item.comment.comment_id} target="_blank">{item.comment.user_name}</Link>
					:null
				}
				</td>
				<td>
					<Link className="del" onClick={this.handleDel.bind(this,index,item.id)}>删除</Link>
				</td>
			</tr>
		)
	})
}
								</tbody>
							</table>
						</div>
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
	myposts: state.post.myposts
  }
}

export default connect(mapStateToProps)(Mymsg);
