'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

require('./less/tieba.less');

import {lstieba} from '../../actions/tieba';
import common from '../../components/common';
import CreateTieba from './create_tieba';
import {history} from '../../';

class Tieba extends Component {

	componentDidMount(){
		lstieba(this.props.companyid, this.props.dispatch);
	}

  render() {
    return (
      <div className="tieba">
        <h2 className="title">
          企业贴吧—同事交流的俱乐部
          <i className="pull-right" data-toggle="modal" data-target="#addTieba">创建贴吧</i>
        </h2>
				<ul>
					{
						this.props.list.map((item,index) => {
							return (
										<li key={item.id}>
											<img src={item.logo} />
											<div className="content">
												<span className="name" onClick={()=>history.push('/posts/'+this.props.companyid+"/"+item.id)}>{item.name}</span>
												<span className="descs">{item.descs}</span>
												<span className="author">版主：{item.leadername}</span>
											</div>
											<span className="nums">
												<i className="today">{item.today_posts}</i>/<i className="total">{item.total_posts}</i>
											</span>
										{
											item.article_title ? 
											<div className="article">
												<Link title={item.article_title} to={"/post/"+this.props.companyid+"/"+item.article_id}>{common.trim(item.article_title,30,true)}</Link>
												<i>{common.trim(item.article_time,16)}&nbsp;&nbsp;{item.article_writer}</i>
											</div>
										: null}
										</li>
							)
						})
					}
				</ul>
        <CreateTieba />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
		list: state.tieba.list
  }
}

export default connect(mapStateToProps)(Tieba);
