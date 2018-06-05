'use strict';

require("./less/sendtwt.less");

import React, { Component } from 'react';
import { connect } from 'react-redux';

require("../../static/jquery-browser");
require("../../static/jquery-qqface/js/jquery.qqFace");

import {
  cdn_url
} from '../../';

import Toast from '../common/toast';

import {
  pushtwtfile,
  add_twitter,
  gettwtvisible,
  addtxtlink,
  gettwtlist,
  getmyowntwt,
} from '../../actions/twitter';

class SendTwitter extends Component {

  constructor(props){
    super(props);
    this.state = {
      errmsg: "", //错误信息
      upimgls: [], //待上传的文件列表
      is_upimg: false,//是否处于上传图片状态
      maximgls: 9, //允许上传的最大数量
      selectedvisible: 1,//选中的可见性规则id
      showlink_flg: false,//是否展示分享链接按钮
      showedlink: "",//分享的链接
      linkconfirm_flg: false,//分享链接确认按钮
    }
  }

  componentWillReceiveProps(nextProps){
    this.initqqface(nextProps);
  }

  componentDidMount(){
    const {uid,token,dispatch} = this.props;
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
    this.initqqface(this.props);
    gettwtvisible(uid, token, dispatch);
  }

  initqqface(props){
    //表情组件
    var emotion = this.refs.emotion;
    $(emotion).qqFace({
        assign:'saytext',
        path:cdn_url+'/library/jQuery-qqFace/arclist/',
        id:"facebox",
        total:75,
        row:13,
        cb: function(){

        }
    });
  }

  //确认链接
  addLink(){
    const {uid, token, dispatch} = this.props;
    let link_url = this.state.showedlink;
    if(link_url.length < 1){
        this.setState({errmsg: "分享链接没有填写"});
        return false;
    }
    if(link_url.indexOf("http") < 0 ){
        this.setState({errmsg: "分享链接必须是http或https开头"});
        return false;
    }
    this.setState({errmsg: ""});
    addtxtlink(link_url, uid, token, dispatch, (data)=>{
      this.setState({linkconfirm_flg: true});
      $(this.refs.link_url).attr("readonly", true);
      $(this.refs.meta_title).attr("href", data.url);
      $(this.refs.meta_title).text(data.title);
      $(this.refs.meta_content).text(data.content);
    });
  }

  //上传图片
  uploadImg(){
		if(this.refs.imgfile.files.length > 0){
			let file = this.refs.imgfile.files[0];
			const {uid,token,dispatch} = this.props;
      if(this.state.upimgls.length == this.state.maximgls){
        this.setState({errmsg: "最多上传"+this.state.maximgls+"张图片哦"});
        return false;
      }
      this.setState({is_upimg: true});
			pushtwtfile(file,uid,token,dispatch,function(imgurl){
        this.state.upimgls.push(imgurl);
        this.setState({
          upimgls: this.state.upimgls,
          is_upimg: false,
        });
			}.bind(this));
		}
	}

  //处理添加链接
  handleAddlink(){
    if(this.state.upimgls.length == 0){
      this.setState({showlink_flg: !this.state.showlink_flg});
    }
  }

  //处理上传图片
  handleUploadfile(){
    if(this.state.showedlink == ""){
      $(this.refs.imgfile).click();
    }
  }

  //删除图片
  removeUpimg(index){
    this.state.upimgls.remove(index);
    this.setState({upimgls: this.state.upimgls});
  }

  //发表推特
  handlePublic(){
    const {uid, token, dispatch} = this.props;
    let upimages = this.state.upimgls.join();
    let content = $(this.refs.content).val();
    let sharedlink = this.state.showedlink;
    if(content.length<1 && upimages.length>1){
      content = "上传了"+this.state.upimgls.length+"张图片";
    }
    if(content.length<1 && sharedlink.length>1){
      content = "分享了一个网页";
    }
    if(content.length<1){
      this.setState({errmsg: "先随便说两句吧......"});
      return false;
    }
    add_twitter(uid, token, content, upimages, sharedlink, this.state.selectedvisible, dispatch, function(status, info, data){
      this.setState({errmsg: "", upimgls: [], showedlink: "",  showlink_flg: false, linkconfirm_flg: false});
      $(this.refs.content).val("");
      if(status == 200){
        new Toast({message: "发表成功"}).show();
        if(this.props.source == "mytwt"){
          getmyowntwt(1, this.props.pagenum, uid, token, dispatch, function(){});
        }else{
          gettwtlist(1, this.props.pagenum, uid, token, dispatch, function(){});
        }
      }else{
        new Toast({message: info}).show();
      }
    }.bind(this));
  }

  render(){
    return(
      <div className="addtopicbox">
        <div className="mainbox">
          <textarea id="saytext" ref="content" placeholder="说点儿什么吧"></textarea>
          <a onClick={this.handleUploadfile.bind(this)} href="javascript:;" data-placement="bottom" data-toggle="tooltip" title="上传图片">
            <i className="clubfriends icon--xiangjicopy2x"></i>
          </a>
          <a onClick={this.handleAddlink.bind(this)} href="javascript:;" data-placement="bottom" data-toggle="tooltip" title="分享网页">
            <i className="clubfriends icon--lianjie"></i>
          </a> 
          <input type="file" onChange={this.uploadImg.bind(this)} accept="image/*" style={{display:"none"}} ref="imgfile" />
        </div>
        {this.state.errmsg ?
        <div className="errmsg">
          <span className="glyphicon glyphicon-remove text-primary"></span>
          {this.state.errmsg}
        </div>
        : null }
        <div className="toolbar">
          <i ref="emotion" className="clubfriends icon--biaoqing"></i>
          <div className="operate">
            <div className="visible">
              可见范围：
              <div className="dropdown">
                  <button type="button" className="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown">
                      {this.props.visiblels.length>0?this.props.visiblels[this.state.selectedvisible].name:""}
                      <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                  {
                    this.props.visiblels.map((item, index)=>{
                      return (
                      <li role="presentation" key={index}>
                          <a role="menuitem" onClick={()=>this.setState({selectedvisible: index})} tabIndex={index} href="#">
                            <i className={"clubfriends "+item.icon}></i>
                            {item.name}
                          </a>
                      </li>
                      )
                    })
                  }
                  </ul>
              </div>
            </div>
            <button onClick={this.handlePublic.bind(this)} className="submit_btn">发表</button>
          </div>
        </div>
      {
        this.state.upimgls.length > 0 || this.state.is_upimg ?
        <div className="uploadimglist">
          <div className="header">
            <i className="clubfriends icon--tupian"></i>
            图片（{this.state.upimgls.length}/{this.state.maximgls}）
            <i className="glyphicon glyphicon-remove pull-right" onClick={()=>this.setState({upimgls: []})}></i>
          </div>
          <div className="body">
{
  this.state.upimgls.length > 0 ?
  this.state.upimgls.map((item, index)=>{
    return (
      <div className="imgblock" key={index}>
        <img src={item} />
        <i title="删除图片" className="glyphicon glyphicon-remove" onClick={this.removeUpimg.bind(this, index)}></i>
      </div>
    )
  })
  :
  <h4>上传图片中。。。</h4>
}
          </div>
        </div>
        :null
      }
      {
      this.state.showlink_flg ? 
      <div className="linkbox">
        <div className="header">
          <div className="main">
            <i className="clubfriends icon--lianjie"></i>
            <input type="text" ref="link_url" placeholder="请填写需要分享的URL链接，http或https开头" value={this.state.showedlink} onChange={(event)=>this.setState({showedlink: event.target.value})} />
            <button type="button" className="btn btn-primary" onClick={this.addLink.bind(this)}>检查链接</button>
          </div>  
          <i className="glyphicon glyphicon-remove" onClick={()=>this.setState({showlink_flg: false, showedlink: "", linkconfirm_flg: false})}></i>
        </div>
        <div className="body" style={{display:this.state.linkconfirm_flg?"block":"null"}}>
          <h3>
            <a ref="meta_title" href="" target="_blank">
            </a>
          </h3>
          <p ref="meta_content">
          </p>
        </div>
      </div>
      :null
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
		companyid: state.login.companyid,
    uid: state.login.uid,
		token: state.login.token,
    page: state.twitter.page,
    pagenum: state.twitter.pagenum,
    visiblels: state.twitter.visiblels,
  }
}

export default connect(mapStateToProps)(SendTwitter);
