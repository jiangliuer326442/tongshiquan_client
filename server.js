/**
 * 项目的基本https服务器
 × 使用了socket和proxy插件
 */

'use strict';

let cfg = require('./app/config');
const SERVER_URL = cfg.SERVER_URL;

var path = require('path'),
		express = require('express'),
		favicon = require('serve-favicon');

var app = express(),
	fs = require('fs'),
	server_url = SERVER_URL,
	server = require('http').createServer(app),
	port = 80;

//加载图标
app.use(favicon(__dirname + '/static/favicon.ico'));
//加载静态资源路径
app.use('/', express.static(__dirname + '/static'));

//socket通信
let my_socket = require('./server_plugin/socket');
my_socket(server,server_url);

//webpack插件
let webpack = require('./server_plugin/webpack');
webpack(app);

//使用代理插件
let proxy = require('./server_plugin/proxy');
proxy(app);

server.listen(port, '0.0.0.0', function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
