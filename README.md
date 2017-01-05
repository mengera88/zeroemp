# zeroemp
易测ios真机远程调试Web端。

## 概览
### 前端
前端基于 [react] 实现。
使用 [webpack] + [gulp] + [babel] 以 ES2015 的语法开发模块。
### 后端
后端运行于 [nodejs] (v5.0+)，完全使用目前版本所支持的 ES6 特性开发。基于 [express] 实现了一个Web应用。


## 开发说明
1. 进入项目根目录，先运行 `npm install`，安装依赖包
2. 进入`ios_minicap_server`目录`cd ios_minicap_server`，运行`./build.sh`编译ios-minicap可执行文件
3. 开发过程中请开启前端实时构建任务，在项目根目录运行 `gulp`和`webpack -w`;
4. 项目是基于pm2管理进程的，因此需要安装[pm2]工具，运行 `sudo npm install -g pm2` 安装pm2
5. 启动web端服务，运行命令 `pm2 start process.json`，如果要查看实时日志，运行`pm2 logs`
6. 开启成功之后开启wda服务，运行`iproxy 8100 8100`
7. demo版本访问地址是`localhost:3000`, wda访问端口是8100
8. 杀掉pm2所有进程，可以运行 `pm2 kill`

[nodejs]: https://nodejs.org/en/
[webpack]: http://webpack.github.io/
[babel]: https://babeljs.io/
[react]: https://facebook.github.io/react/
[gulp]: http://gulpjs.com/
[express]: http://expressjs.com/
[pm2]: http://pm2.keymetrics.io/