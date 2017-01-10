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
5. 启动web端服务，运行命令 `pm2 start process.json`，如果要查看实时日志，运行`pm2 logs`，可以直接运行`pm2 start process.json && pm2 logs`使得在起服务之后立即打印日志信息
6. 开启成功之后开启wda服务（xcode中的项目），然后运行`iproxy 8100 8100`
7. demo版本访问地址是`localhost:3000`, wda服务的访问端口是8100
8. 杀掉pm2所有进程，可以运行 `pm2 kill`
9. 单独跑`wda_ws_service`服务，可以运行命令`pm2 start process.json --only unit-wda-ws-service`
10. 单独跑`ios_minicap_server`服务， 可以运行命令`pm2 start process.json --only unit-ios-minicap`
11. pm2的其他相关命令介绍可以查看[pm2]官网查看

## 项目结构

![项目结果图](ios真机调试项目架构.png)

### 目录结构
```bash
.
├── README.md                        #README文档说明
├── app.js                           #后端项目主文件
├── bin                              #后端入口文件
│   └── www
├── config                           #应用配置
│   ├── build.json                   #webpack等自动化工具路径等配置
│   └── path_config.js               #网络路径配置文件
├── gulpfile.js                      #-
├── ios_minicap_server               #ios_minicap相关服务
│   ├── CMakeLists.txt
│   ├── LICENSE
│   ├── README.md
│   ├── build
│   ├── build.sh
│   ├── ios_minicap_server.js
│   ├── open_xcode.sh
│   ├── run.sh
│   └── src
├── node_modules                      #node依赖               
├── package.json
├── process.json
├── public                            #资源文件
│   ├── css
│   ├── fonts
│   ├── images
│   └── js
├── routes                            #后端路由
│   ├── index.js
│   └── users.js
├── views                             #后端视图文件
│   ├── error.ejs
│   └── index.ejs
├── wda_ws_service                    #wda服务模块，将手机端的http通信进行websocket封装
│   ├── control.js                    #websocket接口封装
│   └── control_interface.js          #向ios真机上的wda服务发送http请求
├── web                               #开发用的web前端源文件
│   ├── assets                        #静态文件
│   ├── js                            #前端js，其中config.js为前端配置文件
│   └── less                          #css相关
└── webpack.config.js                 #webpack配置文件
```
## 部署说明

ios技术架构图如下：
![技术架构](https://git4u.hz.netease.com/hzgujing/zeroemp/blob/9641919677448b97006322411cc21eb765523d6c/iOS%E7%9C%9F%E6%9C%BA%E8%B0%83%E8%AF%95%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%E5%9B%BE.png)

### 手机端
1. 启动ios wda服务，xcode相关，具体可问ios开发相关人员

### Mac Mini端
1. 从[git]仓库下载项目。
2. 进入项目根目录，运行 `npm install`，安装依赖包
3. 进入`ios_minicap_server`目录`cd ios_minicap_server`，运行`./build.sh`编译ios-minicap可执行文件
4. 如果有需要，修改配置的服务器地址，配置位置是：`config`目录下的`path_config.js`，文件中会有相关的注释说明
5. 启动ios minicap服务： `pm2 start process.json --only unit-ios-minicap`
6. 启动wda-ws服务：`pm2 start process.json --only unit-wda-ws-service`
7. 运行`iproxy 8100 8100`

### 云主机
1. 从[git]仓库下载项目。
2. 进入项目根目录，运行 `npm install`，安装依赖包
3. 如果有需要，修改配置文件：`web/js/config.js` 中的相关网络地址
3. 运行webpack编译前端相关文件
4. 启动web服务： `pm2 start process.json --only unit-web`,如果有需要，可以修改相关的配置文件,具体在项目结构中有说明


[nodejs]: https://nodejs.org/en/
[webpack]: http://webpack.github.io/
[babel]: https://babeljs.io/
[react]: https://facebook.github.io/react/
[gulp]: http://gulpjs.com/
[express]: http://expressjs.com/
[pm2]: http://pm2.keymetrics.io/
[git]: https://git4u.hz.netease.com/hzgujing/zeroemp.git