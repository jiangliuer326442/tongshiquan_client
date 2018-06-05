/**
 * 负责 公共遮罩组件
 × 2016.11.30
 × ruby <fanghailiang2016@gmail.com>
 */
import React,{Component} from 'react';

export default class extends Component{
	render(){
		return (
			<div {...this.props} style={{position: "fixed",width: "100%",height: "100%",backgroundColor: "rgba(0,0,0,0.6)",top: "0",left: "0"}}>
				{this.props.children}
			</div>
		);
	}
}
