/**
 * jsp文件的tomcat代理
 */
module.exports = function(app){
  let httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({})
    path = require('path'),
    setProxy = function(req,res){
      if(req.path.indexOf(".jsp")>0){
    		proxy.web(req, res, { target: 'http://10.105.74.199:8080/rubyJSP/' });
    	}else{
    	  res.sendFile(path.join(__dirname, '../index.html'));
    	}
    };

    proxy.on('error', function (err, req, res) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end('Something went wrong. And we are reporting a custom error message.');
    });
    app.get('*', function(req, res) {
      setProxy(req,res);
    });
    app.post('*', function(req, res) {
      setProxy(req,res);
    });
}
