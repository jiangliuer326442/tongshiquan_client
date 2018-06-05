'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import configureStore from '../stores/configureStore';

import {history} from '../';

const store = configureStore();

export default class extends Component {
	render(){
		return (
			<Provider store={store}>
				<Router history={history}>
				<Route path="/" component={require('react-router!../containers/main')} />
				<Route path="/reg/putcompany" component={require('react-router!../containers/register/putcompany')} />
				<Route path="/reg/putphone" component={require('react-router!../containers/register/putphone')} />
				<Route path="/reg/putcode" component={require('react-router!../containers/register/putcode')} />
				<Route path="/mymsg" component={require('react-router!../containers/mymsg')} />
				<Route path="/myreply" component={require('react-router!../containers/myreply')} />
				<Route path="/myarticle" component={require('react-router!../containers/myarticle')} />
				<Route path="/myattendreply" component={require('react-router!../containers/myreply/withmyreply')} />
				<Route path="/manager" component={require('react-router!../containers/manager')} />
				<Route path="/ucenter" component={require('react-router!../containers/ucenter')} />
				<Route path="/chat" component={require('react-router!../containers/chat')} />
				<Route path="/couple" component={require('react-router!../containers/couple')} />
				<Route path="/mycouple" component={require('react-router!../containers/couple/mycouple')} />
				<Route path="mytwtmsg" component={require('react-router!../containers/couple/mytwtmsg')} />
				<Route path="/posts/:companyid/:lid" component={require('react-router!../containers/postspage')} />
				<Route path="/addpost/:companyid/:lid" component={require('react-router!../containers/postspage/create')} />
				<Route path="/post/:companyid/:aid" component={require('react-router!../containers/postspage/detail')} />
				<Route path="/article/:companyid/:aid" component={require('react-router!../containers/articlepage')} />
				<Route path="/company/:companyid" component={require('react-router!../containers/companypage')} />
				</Router>
			</Provider>
		)
	}
}
