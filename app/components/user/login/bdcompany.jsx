/**
 * 负责 用户将自己的账号同特定企业绑定
 × 2016.11.30
 × ruby <fanghailiang2016@gmail.com>
 */
require('./less/bdcompany.less');
import React,{Component} from 'react';
import { connect } from 'react-redux';

import Toast from '../../common/toast';

import {
	setcompany,
	getcompanylist
} from '../../../actions/bdcompany';

import User from './bduser.jsx';

const width = 317;
class Bdcompany extends Component {
		componentDidMount(){
			$(this.refs.name).focus();
			$(this.refs.avatar).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this.refs.avatar).removeClass("flip");
				$(this.refs.avatar).mouseover(function(){
					$(this.refs.avatar).addClass("rubberBand");
					setTimeout(function(){
							$(this.refs.avatar).removeClass('rubberBand');
					}.bind(this), 1500);
				}.bind(this));
				$(this.refs.btn).mouseover(function(){
					$(this.refs.btn).addClass("rubberBand");
					setTimeout(function(){
							$(this.refs.btn).removeClass('rubberBand');
					}.bind(this), 1500);
				}.bind(this));
			}.bind(this));
		}
  	handleNext(){
  		var companyid = jQuery(this.refs.companylist).val();
  		if(typeof companyid != "undefined"){
  			if(companyid == 0){
  				this.setErrormsg("请确认您就职的公司").bind(this);
  			}else{
  				$(this.refs.msg).text("绑定手机号");
				this.props.dispatch(setcompany(companyid));
  			}
  		}else{
  			this.ckcompanyname();
  		}
  	}
  	setErrormsg(msg){
		new Toast({message: msg}).show();
		$(this.refs.avatar).addClass("shake");
		setTimeout(function(){
			$(this.refs.avatar).removeClass('shake');
		}.bind(this), 1500);
  	}
  	//验证公司名称合法性
  	ckcompanyname(){
  		let that = this;
		var showerror = function(msg){
			that.setErrormsg(msg);
			$(that.refs.btn).button('reset');
			return false;
		};
  		$(that.refs.btn).button('loading');
  		let companyname = jQuery(that.refs.name).val();
  		if(companyname.length < 4){
  			showerror("公司名称至少是4个汉字！");
  			return;
  		}else{
  			var isChineseChar = function(str){
			   var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
			   return reg.test(str);
			}
  			for(var i=0; i<companyname.length; i++){
				if (!isChineseChar(companyname[i])){
		  			showerror("公司名称至少是4个汉字！");
		  			return;
				}
  			}
  		}
			jQuery(that.refs.name).css("border-color", "#ccc");
			getcompanylist(companyname,this.props.dispatch, function (status, info, data) {
				if(status == 200){
					jQuery(that.refs.msg).html("<font color='red'>请选择您就职的公司</font>");
					$(that.refs.btn).button('reset');
				}else{
		  			showerror(info);
		  			return;
				}
			});
  	}
  	//渲染企业列表
  	renderCompanyes(){
  		return  (
  			<select ref="companylist" className="animated flash">
  				<option value="0">请选择您就职的公司</option>
	        {this.props.companyList.map(function(company) {
	           return <option key={company.KeyNo} value={company.KeyNo}>{company.Name}</option>;
	        })}
  			</select>
  			    );
  	}
	render(){
		return (
			<div ref="bdcompany" className="bdcompany-box animated bounceInDown">
				{/*头像*/}
				<img className="avatar animated flip" ref="avatar" src={this.props.avatar} />
				{/*提示文字*/}
				<div className="msg" ref="msg">该账号未绑定企业,将用该账号进行注册</div>
			{this.props.selected_company ?
				<div className="user animated flip">
					<User onerror={this.setErrormsg.bind(this)} />
				</div>
				:
				<div className="bdcompany">
					<label>我现在就职的公司是:</label>
					<input type="text" ref="name" placeholder="请填写公司名称" />
					{/*企业列表*/}
					{this.props.companyList.length>0 ? this.renderCompanyes():null}
					<button type="button" ref="btn" className="btn btn-info animated" style={{marginTop:this.props.companyList.length>0 ? "25px":"40px"}} onClick={this.handleNext.bind(this)} data-loading-text="正在校验">下一步</button>
				</div>
			}
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
    avatar: state.login.avatar,
		companyList: state.bdcompany.companyList,
		selected_company: state.bdcompany.selected_company
  }
}

export default connect(mapStateToProps)(Bdcompany);
