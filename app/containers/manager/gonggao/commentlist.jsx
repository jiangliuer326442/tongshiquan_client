'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Header from '../../../components/manager/header';
import {
	getcomments_flat,
	setpage,
	delcomment
} from '../../../actions/comment';

class CommentList extends Component {
	componentDidMount(){
		const {aid,uid,token,dispatch,companyid,page,pagenum} = this.props;
		this.refresh(aid,companyid,page,pagenum,uid,token,dispatch);
	}
	
	refresh(aid,companyid,page,pagenum,uid,token,dispatch){
		getcomments_flat(aid,companyid,page,pagenum,uid,token,dispatch,function(){
			
		}.bind(this));
	}
	
	replace_em(str){ 
			str = str.replace(/</g,'<；'); 
			str = str.replace(/>/g,'>；');
			str = str.replace(/em_([0-9]*)/g,'<Img src="/static/jQuery-qqFace/arclist/$1.gif" border="0" />'); 
			str = str.replace(/\[/g,'');
			str = str.replace(/]/g,'');
			return str;
	}
	
	chgpage(page){
		const {aid,uid,token,dispatch,companyid,pagenum} = this.props;
		setpage(page,dispatch);
		this.refresh(aid,companyid,page,pagenum,uid,token,dispatch);
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
	
	handleDel(cid){
		const {aid,uid,token,dispatch} = this.props;
		delcomment(aid,cid,uid,token,dispatch,function(){
			
		});
	}
	
  render(){
   return (
   <div className="animated flip" style={{height: "100%", backgroundColor:"#fff"}}>
     <div style={{display:"flex",flexDirection:"column",height: "100%",padding:"22px 27px",border:"1px solid #ccc",width:"800px",borderRightWidth:"0px"}}>
       <Header title="文章评论" />
       <div className="admin_form">
         <table className="table table-striped table-hover">
         	<thead>
         		<tr>
         			<th>ID</th>
         			<th>评论内容</th>
         			<th>评论人</th>
              <th>评论时间</th>
              <th>操作</th>
         		</tr>
         	</thead>
         	<tbody>
			{
				this.props.list.map((item,index)=>{
					return <tr>
						       <td>{item.id}</td>
							   <td style={{maxWidth:"300px"}}>
							   {item.to ? 
							   <i style={{color:"#31b0d5",cursor:"pointer"}}>@{item.to}:// </i>
							   : null}
							   <i dangerouslySetInnerHTML={{__html: this.replace_em(item.comment)}}></i>
							   </td>
							   <td>{item.nick}</td>
							   <td>{item.time}</td>
							   <td>
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
		<ul className="pagination pagination-lg">
			<li className={this.props.page<=1?"disabled":""}><Link href="javascript:;" onClick={this.prev.bind(this)}>&laquo;</Link></li>
			{this.renderpage()}
			<li className={this.props.page>=Math.ceil(this.props.num/this.props.pagenum)?"disabled":""}><Link href="javascript:;" onClick={this.next.bind(this)}>&raquo;</Link></li>
		</ul>
	   </div>
	 </div>
   </div>
   )
  }
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
	aid: state.comment.aid,
	companyid: state.company.companyid,
	list: state.comment.list,
	page: state.comment.page,
	pagenum: state.comment.pagenum,
	num: state.comment.num,
	refresh: state.comment.refresh
  }
}

export default connect(mapStateToProps)(CommentList);