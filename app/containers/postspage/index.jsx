'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

require('./less/posts.less');

import Navbar from '../../components/company/navbar';
import {history} from '../../';

import {
	setpage,
	getsectionposts
} from '../../actions/post';

import {
	gettiebacfg
} from '../../actions/tieba';

class Posts extends Component {
  componentDidMount(){
    this.refresh(this.props.params.companyid,this.props.params.lid,this.props.page,this.props.pagenum,this.props.dispatch);
  }

  refresh(companyid,lid,page,pagenum,dispatch){
  		gettiebacfg(lid,this.props.uid,this.props.token,dispatch);
		getsectionposts(companyid,lid,page,pagenum,dispatch,function(){
		}.bind(this));
  }

  gcurrent_model(){
    for(let i=0; i<this.props.tiebas.length; i++){
      if(this.props.tiebas[i].id == this.props.params.lid){
        return this.props.tiebas[i];
        break;
      }
    }
  }


	chgpage(page){
		const {dispatch} = this.props;
		setpage(page,dispatch);
    this.refresh(this.props.params.companyid,this.props.params.lid,page,this.props.pagenum,dispatch);
	}

	prev(){
		let page = this.props.page;
		if(page>1){
			page = page - 1
			this.chgpage(page);
		}
	}

	next(){
		let page = this.props.page;
		let maxpage = Math.ceil(this.props.num/this.props.pagenum);
		if(page<maxpage){
			page = page+1;
			this.chgpage(page);
		}
	}

	renderpage(){
		var page = [];
		for(let i=0; i< Math.ceil(this.props.num/this.props.pagenum); i++){
			page.push(<li className={this.props.page==(i+1)?"active":""}>
						<Link href="javascript:;" onClick={this.chgpage.bind(this,i+1)}>{i+1}</Link>
					  </li>)
		}
		return page;
	}

  render() {
    let cmodel = {};
    if(this.props.tiebas.length > 0){
      cmodel = this.gcurrent_model();
    }else{
    	cmodel.name = this.props.tieba_name;
    	cmodel.can_post_flg = this.props.can_post_flg;
    	cmodel.leaderid = this.props.tieba_leaderid;
    	cmodel.logo = this.props.tieba_logo;
    	cmodel.descs = this.props.tieba_descs;
    }
    return (
      <div>
        <Navbar companyid={this.props.params.companyid} />
        <div className="posts">
          <h2>{cmodel.name} <i className="pull-right">版主：{cmodel.leadername}</i></h2>
          <div className="body">
            <img src={cmodel.logo} />
            <div className="content">
              <div className="num">
                今日<i>{cmodel.today_posts}</i> &nbsp;&nbsp;|&nbsp;&nbsp; 全部<i>{cmodel.total_posts}</i>
              </div>
              <div className="descs">{cmodel.descs}</div>
            </div>
          </div>
        </div>
				<div className="postlists">
					<div className="postlistssub">
	          <ul className="pagination pagination-sm">
	      			<li className={this.props.page<=1?"disabled":""}><Link href="javascript:;" onClick={this.prev.bind(this)}>&laquo;</Link></li>
	      			{this.renderpage()}
	      			<li className={this.props.page>=Math.ceil(this.props.num/this.props.pagenum)?"disabled":""}><Link href="javascript:;" onClick={this.next.bind(this)}>&raquo;</Link></li>
	      		</ul>
						{
              cmodel.can_post_flg || cmodel.leaderid == this.props.uid ?
              <button type="button" className="btn btn-warning" onClick={()=>history.push('/addpost/'+this.props.params.companyid+'/'+this.props.params.lid)}>发帖</button>
              : null
            }
					</div>
					<table className="table poststable">
						<thead>
							<tr>
								<th width="60%">普通主题</th>
								<th>作者</th>
								<th>发布时间</th>
								<th>回复</th>
								<th>最后发表</th>
							</tr>
						</thead>
						<tbody>
{
  this.props.list.map((item,index)=>{
    return 		<tr>
    						<td className="title"><img src={require("./images/topicnew.gif")} /><Link to={"/post/"+this.props.params.companyid+"/"+item.id}>{item.title}</Link></td>
    						<td className="nick"><Link to="">{item.user_nick}</Link></td>
								<td className="date">{item.showtime}</td>
    						<td>{item.commenttimes}</td>
    						<td>
									<div className="nick">{item.comment_nick}</div>
									<div className="date">{item.comment_time}</div>
								</td>
    					</tr>
  })
}
						</tbody>
					</table>
					<div className="postlistssub">
	          <ul className="pagination pagination-sm">
	      			<li className={this.props.page<=1?"disabled":""}><Link href="javascript:;" onClick={this.prev.bind(this)}>&laquo;</Link></li>
	      			{this.renderpage()}
	      			<li className={this.props.page>=Math.ceil(this.props.num/this.props.pagenum)?"disabled":""}><Link href="javascript:;" onClick={this.next.bind(this)}>&raquo;</Link></li>
	      		</ul>
						{
              cmodel.can_post_flg || cmodel.leaderid == this.props.uid ?
              <button type="button" className="btn btn-warning" onClick={()=>history.push('/addpost/'+this.props.params.companyid+'/'+this.props.params.lid)}>发帖</button>
              : null
            }
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
    tiebas: state.tieba.list,
    list: state.post.list,
    page: state.post.page,
  	pagenum: state.post.pagenum,
  	num: state.post.num,
	is_allow_comment: state.tieba.is_allow_comment,
	is_hide_comment: state.tieba.is_hide_comment,
	tieba_leaderid: state.tieba.leaderid,
	tieba_logo: state.tieba.logo,
	tieba_name: state.tieba.name,
	tieba_descs: state.tieba.descs,
	can_post_flg: state.tieba.can_post_flg,
  }
}

export default connect(mapStateToProps)(Posts);
