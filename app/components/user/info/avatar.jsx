import React,{Component} from 'react';
import { connect } from 'react-redux';

import {
	company_setmyavatar
} from '../../../actions/user';

class Avatar extends Component {
	handleAvatar(){
		const {uid,token,dispatch} = this.props;
		let avatar = this.refs.avatar.files.length > 0 ? this.refs.avatar.files[0]:this.props.avatar;
		company_setmyavatar(uid,token,avatar,dispatch,function(avatar){

		});
	}
	render(){
		return (
			<div className="modal fade" id="avatarModal" tabindex="-1" role="dialog" aria-labelledby="avatarModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">
								&times;
							</button>
							<h4 className="modal-title" id="avatarModalLabel">
								上传头像
							</h4>
						</div>
						<div className="modal-body">
							<form className="form-inline" role="form">
								<div className="form-group">
									<input type="file" ref="avatar" />
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default" data-dismiss="modal">关闭
							</button>
							<button type="button" onClick={this.handleAvatar.bind(this)} className="btn btn-primary" data-dismiss="modal">
								上传
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
		avatar: state.company.avatar,
  }
}

export default connect(mapStateToProps)(Avatar);
