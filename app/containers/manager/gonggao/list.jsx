'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Header from '../../../components/manager/header';
import common from '../../../components/common';

import {
	getarticles,
	setarticleistop,
	getarticlebyadmin,
	delarticle
} from '../../../actions/article';
import {
	setcommentaid
} from '../../../actions/comment';
import {
  setsmallkindid
} from '../../../actions/manager';

class List extends Component {

	componentDidMount(){
		getarticles(this.props.refid,this.props.uid,this.props.token,this.props.dispatch);
	}
	
	componentWillReceiveProps(nextProps){
		getarticles(nextProps.refid,nextProps.uid,nextProps.token,nextProps.dispatch);
	}
	
	setArticle(aid){
		const {uid,token,dispatch,current_selected} = this.props;
		getarticlebyadmin(uid,token,aid,dispatch,function(){
			dispatch(setsmallkindid(5));
		}.bind(this));
	}
	
	setComment(aid){
		const {dispatch} = this.props;
		setcommentaid(aid,dispatch);
		dispatch(setsmallkindid(6));
	}
	
	handleIstop(aid,is_top){
		const {uid,token,dispatch} = this.props;
		setarticleistop(aid,is_top,uid,token,dispatch,function(){
			
		}.bind(this));
	}
	
	handleDel(aid){
		const {uid,token,dispatch} = this.props;
		delarticle(aid,uid,token,dispatch,function(){
			
		}.bind(this));
	}

  render(){
   return (
   <div className="animated bounceInUp" style={{height: "100%", backgroundColor:"#fff"}}>
     <div style={{display:"flex",flexDirection:"column",height: "100%",padding:"22px 27px",border:"1px solid #ccc",width:"800px",borderRightWidth:"0px"}}>
       <Header title="文章列表" />
       <div className="admin_form">
         <div className="alert alert-success" style={{display:"none"}}>
         </div>
         <div className="alert alert-danger" style={{display:"none"}}>
         </div>
         <table className="table table-striped table-hover">
         	<thead>
         		<tr>
         			<th>ID</th>
         			<th>标题</th>
         			<th>阅读数</th>
              <th>评论数</th>
              <th>置顶</th>
              <th>发布时间</th>
              <th>操作</th>
         		</tr>
         	</thead>
         	<tbody>
          {
            this.props.list.map((item, index) => {
              return <tr>
                        <td>{item.id}</td>
                        <td><Link href={"/article/"+this.props.companyid+"/"+item.id} target="_blank" title={item.title}>{common.trim(item.title,14,true)}</Link></td>
                        <td>{item.readtimes}</td>
                        <td>{item.commenttimes}</td>
                        <td><a href="javascript:;" onClick={this.handleIstop.bind(this,item.id,!item.is_top)}>{item.is_top ? "取消置顶":"置顶"}</a></td>
                        <td>{item.showtime}</td>
                        <td>
                        <Link className="btn btn-info" href="javascript:;" onClick={this.setArticle.bind(this,item.id)} role="button" style={{textShadow: "black 5px 3px 3px"}}>
													<span className="glyphicon glyphicon-edit"></span>
													修改
												</Link>
                        <Link className="btn btn-warning" href="javascript:;" onClick={this.setComment.bind(this,item.id)} role="button" style={{textShadow: "black 5px 3px 3px"}}>
													<span className="	glyphicon glyphicon-sound-stereo"></span>
													评论
												</Link>
                        <Link className="btn btn-danger" href="javascript:;" onClick={this.handleDel.bind(this,item.id)} role="button" style={{textShadow: "black 5px 3px 3px"}}>
							<span className="glyphicon glyphicon-trash"></span>
							删除
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
    list: state.article.articlelist,
		is_refresh: state.article.is_refresh,
		current_selected: state.managernav.current_selected,
		companyid: state.company.companyid
  }
}

export default connect(mapStateToProps)(List);
