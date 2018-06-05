import React,{Component} from 'react';
import { connect } from 'react-redux';

import {
	company_setmynick
} from '../../../actions/user';

class Nick extends Component {
	handleNick(){
		const {uid,token,dispatch} = this.props;
		let nick = this.refs.nick.value;
		if($.trim(nick) == ''){
			this.showerror('昵称不能为空');
			return;
		}
		if(nick.length<2 || nick.length>10){
			this.showerror('昵称不合规范');
			return;
		}
		company_setmynick(uid,token,nick,dispatch);
	}
 showerror(msg){
   jQuery(".alert-danger").show();
   jQuery(".alert-danger").text(msg);
   jQuery(this.refs[ref]).css("border-color","red");
 }
	render(){
		return (
			<div className="modal fade" id="nickModal" tabindex="-1" role="dialog" aria-labelledby="nickModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">
								&times;
							</button>
							<h4 className="modal-title" id="nickModalLabel">
								修改昵称
							</h4>
						</div>
						<div className="modal-body">
							<form className="form-inline" role="form">
								<div className="alert alert-success" style={{display:"none"}}>
								</div>
								<div className="alert alert-danger" style={{display:"none"}}>
								</div>
								<div className="form-group">
									<input type="text" className="form-control" ref="nick" placeholder="请填写您在本公司的昵称" />
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default" data-dismiss="modal">关闭
							</button>
							<button type="button" onClick={this.handleNick.bind(this)} className="btn btn-primary" data-dismiss="modal">
								修改
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    uid: state.login.uid,
    token: state.login.token,
		nick: state.company.unick,
  }
}

export default connect(mapStateToProps)(Nick);
