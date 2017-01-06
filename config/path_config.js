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