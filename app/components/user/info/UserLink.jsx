import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Mask from '../../common/mask';
import Card from '../../user/info/card';
import {
	setcarduser
} from '../../../actions/userlink';

require('./less/userlink.less');

class UserLink extends Component {
	handleClick(){
		if(this.props.myuid != this.props.uid){
			if(this.props.current_uid == this.props.uid){
				setcarduser(-1, this.props.dispatch);
			}else{
				setcarduser(this.props.uid, this.props.dispatch);
			}
		}
	}

	handleHide(event){
		if($(event.target).hasClass("container")){
			setcarduser(-1, this.props.dispatch);
		}
	}

	render(){
		return (
			this.props.uid>0 && this.props.uid!=this.props.myuid ?
			<span>
				<Link onClick={this.handleClick.bind(this)}>{this.props.children}</Link>
				{this.props.current_uid == this.props.uid && this.props.current_uid != this.props.myuid ?
					<Mask title="点击关闭" onClick={this.handleHide.bind(this)} className="container">
						<div className="box">
							<Card source="twitter" selecteduid={this.props.current_uid} />
						</div>
					</Mask>
				:null}
			</span>
			:
			<span>{this.props.children}</span>
		)
	}
}

UserLink.propTypes = {
  uid: React.PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
  	current_uid: state.userlink.uid,
  	myuid: state.login.uid,
  }
}

export default connect(mapStateToProps)(UserLink);