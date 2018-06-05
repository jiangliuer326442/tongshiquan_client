'use strict';

require("./less/articlelist.less");

import React, {
	Component
} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {
	getarticlelistbyaid
} from '../../actions/article';

class Articlelist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			maxpage: 0,
		};
	}
	
	prev(){
		let page = this.state.page;
		if(page>1){
			page = page-1;
			const {aid,pagenum,dispatch} = this.props;
			getarticlelistbyaid(aid,page,pagenum,dispatch,function(){});
		}
		this.state.page = page;
	}
	
	next(){
		let page = this.state.page;
		if(page<this.state.maxpage){
			page = page+1;
			const {aid,pagenum,dispatch} = this.props;
			getarticlelistbyaid(aid,page,pagenum,dispatch,function(){});
		}
		this.state.page = page;
	}
	
	componentDidMount() {
		const {aid,pagenum,dispatch} = this.props;
		getarticlelistbyaid(aid,this.state.page,pagenum,dispatch,function(num){
			this.state.maxpage = Math.ceil(num/this.props.pagenum);
		}.bind(this));
	}
	
	render(){
		return (						
			<div className="articlelist">
				<h3>文章列表</h3>
				<ul>
{this.props.articlelist.map((item,index)=>{
	return (
					<li><Link to={"/article/"+this.props.companyid+"/"+item.id}>{item.title}</Link></li>
	)
})}		
				</ul>
				<ul className="pager">
					<li className={this.state.page==1?"disabled":""}><Link href="javascript:;" onClick={this.prev.bind(this)}>上一页</Link></li>
					<li className={this.state.page>=this.state.maxpage?"disabled":""}><Link href="javascript:;" onClick={this.next.bind(this)}>下一页</Link></li>
				</ul>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		articlelist: state.article.articlelist,
	}
}

export default connect(mapStateToProps)(Articlelist);