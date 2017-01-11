/**
 * 真机web端前端相关配置文件,web页面访问的相关配置
 * url——web页面后端需要访问的设备地址
 * socketUrl——web页面前端访问后端wda_ws服务的url地址
 * @author  jessica(hzgujing@corp.netease.com)
 */


let deviceConfig = {
    // 'url': 'http://10.240.252.202:8100',       //设备url地址
    // 'socketUrl': 'http://10.240.252.202:8080'  //wda_ws服务的url地址
    'url': 'http://localhost:8100',       //mac mini服务器地址，端口号为访问设备信息的端口
    'socketUrl': 'http://localhost:8080'  //wda_ws服务的url地址，即mac mini服务器地址
}

export default deviceConfig;