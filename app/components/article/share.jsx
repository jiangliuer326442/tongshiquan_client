'use strict';
require('jquery.qrcode');

require('./less/share.less');

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Share extends Component {
	constructor(){
    super();
    this.state = {
      show_qrcode_flg: false
    }
  }

	componentDidMount(){
		$(this.refs.qrcode).qrcode({
		    render: "table", //table方式
		    width: 200, //宽度
		    height:200, //高度
		    text: this.props.url //任意内容
		});
	}

	showqrcode(){
		this.setState({show_qrcode_flg: true});
	}

	hideqrcode(){
		this.setState({show_qrcode_flg: false});
	}

  render(){
    return  <div className="bdsharebuttonbox">
								<a href="javascript:;" onClick={this.showqrcode.bind(this)} className="bds_weixi" data-cmd="weixin" title="分享到微信">
									<img src={require("./img/weixin.png")} />
									微信
								</a>
								<div className="qrcode_box" style={{display:this.state.show_qrcode_flg ? "block":"none"}}>
									<div className="header">
										<span className="title">分享到微信朋友圈</span>
										<a href="javascript:;" className="close" onClick={this.hideqrcode.bind(this)}>×</a>
									</div>
									<div ref="qrcode"></div>
									<div className="footer">
									打开微信，点击底部的“发现”，<br />使用“扫一扫”即可将网页分享至朋友圈
									</div>
								</div>
						</div>
  }
}

export default connect()(Share);
