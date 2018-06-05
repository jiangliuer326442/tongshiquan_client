'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {
  getfarticles,
  setarticle
} from '../../actions/article';

import common from '../../components/common';

require('./less/gongsixinwen.less');

class Gongsixinwen extends Component {
  componentDidMount(){
    const {companyid,dispatch} = this.props;
    getfarticles(companyid,dispatch);
  }

  setarticle(id,title){
    setarticle(id,title,this.props.companyid,this.props.dispatch);
  }

  render() {
    return (
      <div className="mainsection">
        <h2 className="title">{this.props.title}</h2>
        <div className="articlelist">
{
  this.props.list.map((item,index) => {
    return ( 
      <div className="article col-xs-12">
        <img src={item.thumb} className="visible-md" />
        <div className="texts">
          <h3><Link title={item.title} style={item.is_top?{color:"red"}:null} onClick={this.setarticle.bind(this,item.id, item.title)}>{common.trim(item.title, 33, true)}</Link></h3>
          <article>
          {common.trim(item.desc, 80, true)}
          </article>
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
    title: state.article.title,
    list: state.article.articlelist
  }
}

export default connect(mapStateToProps)(Gongsixinwen);
