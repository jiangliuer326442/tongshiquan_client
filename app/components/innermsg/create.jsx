'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {send_innermsg} from '../../actions/innermsg';

/**
 * 创建站内消息
 */
class Create extends Component {

  handleSend(){
    const {to_uid,uid,token,dispatch} = this.props;
    let content = $(this.refs.content).val();
    if($.trim(content) == ''){
      this.showerror('请写上您想说的话');
			return;
    }
    if(content.length<4 || content.length>100){
			this.showerror('内容过长');
			return;
		}
    send_innermsg(to_uid, content, uid, token, dispatch, function(){
      $('#innermsgModal').modal('hide');
    });
  }

  showerror(msg){
    jQuery(".alert-danger").show();
    jQuery(".alert-danger").text(msg);
    jQuery(this.refs[ref]).css("border-color","red");
  }

  render() {
    return (
      <div className="modal fade" id="innermsgModal" tabindex="-1" role="dialog" aria-labelledby="innermsgModalLabel" aria-hidden="true">
      	<div className="modal-dialog">
      		<div className="modal-content">
      			<div className="modal-header">
      				<button type="button" className="close" data-dismiss="modal" aria-hidden="true">
      					&times;
      				</button>
      				<h4 className="modal-title" id="innermsgModalLabel">
      					发送给 {this.props.to_name} 的私信
      				</h4>
      			</div>
      			<div className="modal-body">
              <form className="form-horizontal" role="form">
                <div className="alert alert-success" style={{display:"none"}}>
								</div>
								<div className="alert alert-danger" style={{display:"none"}}>
								</div>
                <div className="form-group">
                  <div className="col-sm-10">
                    <textarea className="form-control" ref="content" placeholder="请写上您想说的话"></textarea>
                  </div>
                </div>
              </form>
      			</div>
      			<div className="modal-footer">
      				<button type="button" className="btn btn-default" data-dismiss="modal">关闭
      				</button>
      				<button type="button" onClick={this.handleSend.bind(this)} className="btn btn-primary">
      					发送
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
    to_uid: state.innermsg.to_uid, //收件人用户id
    to_name: state.innermsg.to_name, //收件人姓名
  }
}

export default connect(mapStateToProps)(Create);
