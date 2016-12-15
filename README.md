# zeroemp
易测ios真机远程调试Web端。

## 概览
### 前端
前端基于 [react] 实现。
使用 [webpack] + [gulp] + [babel] 以 ES2015 的语法开发模块。
### 后端
后端运行于 [nodejs] (v5.0+)，完全使用目前版本所支持的 ES6 特性开发。基于 [express] 实现了一个Web应用。


## 开发说明
1. 进入项目根目录，先运行 npm install，安装依赖包
2. 开发过程中请开启前端实时构建任务，在项目根目录运行 `gulp`;
3. 启动web端服务，运行命令 npm start
4. 开启成功之后开启wda服务，运行iproxy 8100 8100 
5. demo版本访问地址是localhost:3000, wda访问端口是8100

[nodejs]: https://nodejs.org/en/
[webpack]: http://webpack.github.io/
[babel]: https://babeljs.io/
