'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

require('./less/qitagonggao.less');

import {
  getoarticles,
	setarticle,
	setcurrentsection
} from '../../actions/article';
import common from '../../components/common';

class Qitagonggao extends Component {
  componentDidMount(){
    const {companyid,dispatch} = this.props;
    getoarticles(companyid,dispatch);
  }
	
  setarticle(id,title){
    setarticle(id,title,this.props.companyid,this.props.dispatch);
  }
	
	render(){
		let article_list = [];
		for(let i=0; i<this.props.list.length; i++){
			if(this.props.list[i].id == this.props.current){
				article_list = this.props.list[i].list;
			}
		}
		
		return (
			<div className="othernotice">
				<ul className="tab_box">
{
  this.props.list.map((item,index) => {
    return (
      <li key={item.id} className={item.id==this.props.current ? "current":""} onClick={()=> setcurrentsection(item.id,this.props.dispatch)}>{item.name}</li>
    )
  })
}
				</ul>
        <div className="articlelist">
{
	article_list.map((item,index) => {
		return (
					<div className="article" onClick={this.setarticle.bind(this,item.id, item.title)}>
						<img src={item.thumb} />
						<div className="texts">
							<h3><Link title={item.title}>{item.title}</Link></h3>
							<article>{item.desc}</article>
						</div>
					</div>
		)
	})
}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
		list: state.article.oarticles,
		current: state.article.coarticlesection
  }
}

export default connect(mapStateToProps)(Qitagonggao);