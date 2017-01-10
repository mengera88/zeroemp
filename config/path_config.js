/**
 * 真机调试web端后端相关配置文件
 * wda_service —— 后端封装的wda_service服务的地址，该服务配置在mac mini上，因此需要填写mac mini的网络地址
 * sockios_minicap_serviceetUrl —— web页面后端访问ios minicap服务的host地址信息，ios minicap服务配置在mac mini上，因此需要填写那里的地址
 * @author  jessica(hzgujing@corp.netease.com)
 */

const urlConfig = {
    wda_service: {
        webUrl: "http://localhost:3000",
        deviceUrl: "http://localhost:8100"
    },
    ios_minicap_service: {
        // ios_server_host: "10.240.252.202"  //链接ios_minicap服务的host信息
        ios_server_host: "localhost"  //链接ios_minicap服务的host信息
    }
}

module.exports = urlConfig;