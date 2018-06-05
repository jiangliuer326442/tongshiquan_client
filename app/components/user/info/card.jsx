import React,{Component} from 'react';
import { connect } from 'react-redux';

require('../../../static/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css');
require('../../../static/bootstrap-switch/js/bootstrap-switch.min.js');
require('./less/card.less');

import {
	getsbemployeeinfo
} from '../../../actions/company';
import {
	markuser
} from '../../../actions/user';
import {
	pushchat
} from '../../../actions/chat';
import {
	delfriend
} from '../../../actions/friendslist';
import {
	makecare
} from '../../../actions/care';
import {
	deldeluser,
	hidetwtbyuid,
	hidemytwtbyuuid,
	delmydeluser
} from '../../../actions/twitter';

class Card extends Component {
	constructor(props) {  
		super(props);
		this.state = {
			avatar: "",
			markedname: "",
			companyname: "",
			unick: "",
			umail: "",
			uphone: "",
			friend_flg: false,
			care_flg: false,
			editflg: false,
			watch_his: false,
			allow_him: false
		};
	}  

	
	handleCare(){
		const {selecteduid,uid,token,dispatch} = this.props;
		makecare(selecteduid,uid,token,dispatch,function(){
			this.setState({
				care_flg: !this.state.care_flg
			});
		}.bind(this));
	}
	
	componentDidMount(){
		this.getuserdetail(this.props);
	}
	
	componentWillReceiveProps(nextProps){
		this.getuserdetail(nextProps);
	}
	
	getuserdetail(props){
		const {selecteduid,uid,token,dispatch} = props;
		getsbemployeeinfo(selecteduid,uid,token,dispatch,(data)=>{
			this.setState({
				avatar: data.avatar,
				markedname: data.markedname,
				companyname: data.companyname,
				unick: data.unick,
				umail: data.umail,
				uphone: data.uphone,
				friend_flg: data.friend_flg,
				care_flg: data.care_flg,
				watch_his: data.watchhim_flg,
				allow_him: data.allowhim_flg
			});
			this.triggleSwitch();
		});
	}
r
	triggleSwitch(){
		const {selecteduid,uid,token} = this.props;
		$("#allowhim_flg").bootstrapSwitch({onSwitchChange: (e,value)=>{
			if(value){
				hidemytwtbyuuid(selecteduid, uid, token, (status)=>{});
			}else{
				delmydeluser(selecteduid, uid, token, (status)=>{});
			}
		}  });
		$("#watchhim_flg").bootstrapSwitch({onSwitchChange: (e,value)=>{
			if(value){
				hidetwtbyuid(selecteduid, uid, token, ()=>{});
			}else{
				deldeluser(-1, selecteduid, uid, token, null, ()=>{});
			}
		} });
	}
	
	handleEdit(){
		this.setState({
			editflg: true
		});
	}
	
	handleMarkedname(){
		const {selecteduid,uid,token,dispatch} = this.props;
		markuser(selecteduid,$(this.refs.markedname).val(),uid,token,dispatch)
		this.setState({
			editflg: false,
			markedname: $(this.refs.markedname).val()
		});
	}
	
	handleSendmsg(){
		pushchat(this.props.selecteduid, this.props.dispatch);
	}
	
	handleDelfriend(){
		const {selecteduid, uid, token, dispatch} = this.props;
		delfriend(selecteduid, uid, token, dispatch);
	}

	render(){
		return (
			<div className="card_userinfo">
				<div className="card_body">
					<div className="card_left">
						<img className="card_avatar" src={this.state.avatar} />
					</div>
					<div className="card_right">
						<h3 className="card_uname">
							{this.state.unick}
							<small className="card_markname">(
							{this.state.editflg?
								<span>
									<input type="text" ref="markedname" style={{width:"7em"}} defaultValue={this.state.unick} />
									<button onClick={this.handleMarkedname.bind(this)} type="button" className="card_btn btn-default btn-sm">确定</button>
								</span>
							:
								<span>
									{this.state.markedname}
									<span className="glyphicon glyphicon-edit" title="填写备注" onClick={this.handleEdit.bind(this)}></span>
								</span>
							}
							)</small>
						</h3>
						<p className="card_phone">手机：{this.state.uphone}</p>
						<p className="card_mail">邮箱：{this.state.umail}</p>
						{this.props.selecteduid!=this.props.uid && this.props.source == "chat" ?
						<button onClick={this.handleSendmsg.bind(this)} type="button" className="card_btn btn-success">发消息</button>
						:
						<p className="card_companyname">{this.state.companyname}</p>
						}
					</div>
				</div>	
				<div className="card_operateinfo">
					<p className="card_hidden1">
						<label>不让Ta看我的同事圈</label>
						<input type="checkbox" id="allowhim_flg" checked={this.state.allow_him} />
					</p>
					<p className="card_hidden2">
						<label>不看Ta的同事圈</label>
						<input type="checkbox" id="watchhim_flg" checked={this.state.watch_his} />
					</p>
					{this.props.selecteduid!=this.props.uid?
					this.state.friend_flg?
					<button onClick={this.handleDelfriend.bind(this)} type="button" className="btn btn-danger">删除好友</button>
					:
					this.state.care_flg ? 
					<button type="button" className="btn btn-primary disabled" disabled>已关注</button>:
					<button onClick={this.handleCare.bind(this)} type="button" className="btn btn-primary">关注Ta</button>
					:null}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
  }
}

export default connect(mapStateToProps)(Card);
