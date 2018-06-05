# 卡拉布同事圈 前端 
## 项目说明
[卡拉布同事圈](http://www.companyclub.cn)，致力于成为企业内部论坛的公共平台，包含企业通知、企业贴吧、聊天、同事圈四大模块，同时，对企业内个管理者，提供相应的管理功能
## 技术选型
本项目前端使用webpack打包部署，将图片，less文件，jsx文件按照路由打包为独立的js，此外将各个路由都可能公用的模块打包为lib.js
项目使用React框架开发，各个路由使用ReactRouter管理，通过Redux管理全局状态
## 开发：
* npm install
* npm run server
## 打包：
* webpack --config ddl.config.js
* webpack
## 运行容器
* docker pull jiangliuer326442/lnmp
* docker run -it -d -p 80:80 -p 3306:3306 -p 6379:6379 -v /data/database/mysql:/usr/local/mysql/var -v /data/wwwroot/nginx/vhost:/usr/local/nginx/conf/vhost -v /data/wwwroot/nginx/wwwroot:/home/wwwroot jiangliuer326442/lnmp

对外暴露端口：
80 网站服务器
3306 数据库服务器
6379 redis服务器

数据卷映射：
/usr/local/mysql/var mysql数据库文件
/usr/local/nginx/conf/vhost nginx虚拟主机配置文件
/home/wwwroot 网站目录