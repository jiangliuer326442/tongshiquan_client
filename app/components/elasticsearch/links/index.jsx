'use strict';

require('../../common/confirm');
require('./less/index.less');

import common from '../../common';
import {
	delconnact,
	setcrtconnact,
	getdbs
} from '../../../actions/elastic';

  import React, { Component } from 'react';
  import { connect } from 'react-redux';

  class Getlinks extends Component {
		constructor(props) {
	      super(props);
				let show_db_arr = new Array()
				for(let i=0; i<props.link_arr.length; i++){
					show_db_arr[i] = false;
				}
	      this.state = {
	        showdbs: show_db_arr
	      };
	  }
    	componentDidMount(){
    		$("[data-toggle='tooltip']").tooltip();
    	}
			addlink(){
				setcrtconnact("","",9200,"","",this.props.dispatch);
				$('#addlink').modal({
					keyboard: true
				});
			}
			editlink(name,host,port,user,pass){
				setcrtconnact(name,host,port,user,pass,this.props.dispatch);
				$('#addlink').modal({
					keyboard: true
				});
			}
			dellink(linkname){
				Ewin.confirm({ message: "确认要删除连接吗？" }).on(e => {
					if (!e) {
						return;
					}
					delconnact(linkname, this.props.dispatch);
				});
			}
			showdbs(index,name,host,port,user,pass){
				const {dispatch} = this.props;
				setcrtconnact(name,host,port,user,pass,dispatch);
				this.state.showdbs[index] = ! this.state.showdbs[index];
				let is_showdb = this.state.showdbs[index];
				if(is_showdb){
					getdbs(name,host,port,user,pass,dispatch,function(){

					});
				}
				this.setState(this.state);
			}
      render(){
        return (
          <div className="links_list-box">
            <h3>连接列表<span className="glyphicon glyphicon-plus pull-right" data-toggle="tooltip" title="新建连接" data-placement="left" onClick={this.addlink.bind(this)}></span></h3>
  					<ul className="link-list list-group">
  		{
  			this.props.link_arr.map((item,index) => {
  				return 	<li className="list-group-item link-item">
  									<span onDoubleClick={this.showdbs.bind(this,index,item.name,item.host,item.port,item.user,item.pass)}>
                      <em title="双击打开/关闭连接">{common.trim(item.name,17,true)}</em>
											<i title="操作" id="linkMenu" data-toggle="dropdown" className="dropdown-toggle glyphicon glyphicon-list pull-right link-operation link-list"></i>
											<ul className="dropdown-menu" role="menu" aria-labelledby="linkMenu">
									        <li role="presentation" className="dropdown-header">连接</li>
									        <li role="presentation">
									            <a role="menuitem" tabindex="-1" href="javascript:;" onClick={this.editlink.bind(this,item.name,item.host,item.port,item.user,item.pass)}>修改连接</a>
									        </li>
									        <li role="presentation">
									            <a role="menuitem" tabindex="-1" href="javascript:;" onClick={this.dellink.bind(this,item.name)}>删除连接</a>
									        </li>
									    </ul>
                    </span>
										{this.state.showdbs[index] ?
  									<ul className="db-list list-group">
										{
											item.dbs.map((item,index) => {
												if(item.substr(0,1) != "."){
													return <li className="db-item list-group-item">{item}</li>
												}
											})
										}
  									</ul>
										: null }
  								</li>
  			})
  		}
  					</ul>
          </div>
        );
      }
  }

  function mapStateToProps(state) {
  	return {
      link_arr: state.elastic.link_arr,
			name: state.elastic.current_linkname,
	    host: state.elastic.current_linkhost,
	    port: state.elastic.current_linkport,
	    user: state.elastic.current_linkuser,
	    pass: state.elastic.current_linkpass
    }
  }

  export default connect(mapStateToProps)(Getlinks);
