/**
 * 控制真机接口
 * @author  jessica(hzgujing@corp.netease.com)
 */

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export default class DeviceControl {
    constructor(url) {
        this.deviceUrl = url;
    }

    //返回Home键
    returnHome() {
        console.log(this.deviceUrl)
        fetch(this.deviceUrl + '/homescreen', {
            method: 'post',
            mode: 'no-cors'
        })
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
            console.log("request success "+data)
        }).catch((err) => {
            console.log("request failed "+err)
        })
    }

    //单击事件
    handleMouseDown(x, y) {
        fetch(this.deviceUrl + '/DeviceControl/click', {
            method: 'post',
            mode: 'no-cors',
            body: JSON.stringify({
                x: x,
                y: y
            })
        })
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
            console.log("request success "+data)
        }).catch((err) => {
            console.log("request failed "+err)
        })

    }

    //双击事件


    //长按

    //拖拽
}