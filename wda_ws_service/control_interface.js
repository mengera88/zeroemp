/**
 * 控制真机接口服务工具，提供给wda_service服务调用
 * @author  jessica(hzgujing@corp.netease.com)
 */

const fetch = require('node-fetch');

class DeviceControl {
    constructor(url, socket) {
        this.deviceUrl  = url;
        this.socket = socket;
    }
    //返回Home键
    returnHome() {
        fetch(this.deviceUrl + '/homescreen', {
            method: 'post'
        })
        .then((data) => {
            console.log('request success')
        }).catch((err) => {
            console.log('request failed')
            console.log(err)
        })
    }

    //单击事件
    handleClick(x, y) {
        console.log("单击坐标信息("+ x, y + ")")
        fetch(this.deviceUrl + '/deviceControl/click', {
            method: 'post',
            body: JSON.stringify({
                x: x,
                y: y
            })
        })
        .then((data) => {
            console.log('request success')
        }).catch((err) => {
            console.log('request failed')
            console.log(err)
        })
    }

    //双击事件
    handleDoubleClick(x, y) {
        console.log("双击击坐标信息("+ x, y + ")")
        fetch(this.deviceUrl + '/deviceControl/doubleClick', {
            method: 'post',
            body: JSON.stringify({
                x: x,
                y: y
            })
        })
        .then((data) => {
            console.log('request success')
        }).catch((err) => {
            console.log('request failed')
            console.log(err)
        })
    }

    //长按
    handleTouchAndHold(x, y, duration) {
        duration = parseFloat(duration/1000);
        fetch(this.deviceUrl + '/deviceControl/touchAndHold', {
            method: 'post',
            body: JSON.stringify({
                x: x,
                y: y,
                duration: duration
            })
        })
        .then((data) => {
            console.log('request success')
        }).catch((err) => {
            console.log('request failed')
            console.log(err)
        })
    }

    //拖拽
    handleDrag(fromX, fromY, toX, toY, pressDuration, dragDuration) {
        pressDuration = parseFloat(pressDuration/1000);
        dragDuration = parseFloat(dragDuration/1000);
        console.log(fromX, fromY, toX, toY, pressDuration, dragDuration)
        fetch(this.deviceUrl + '/deviceControl/dragFromToForDuration', {
            method: 'post',
            body: JSON.stringify({
                fromX: fromX,
                fromY: fromY,
                toX: toX,
                toY: toY,
                pressDuration: pressDuration,
                dragDuration: dragDuration
            })
        })
        .then((data) => {
            console.log('request success')
        }).catch((err) => {
            console.log('request failed')
            console.log(err)
        })
    }

    //获取设备旋转状态
    getOrientation() {
        return fetch(this.deviceUrl + '/deviceControl/getOrientation', {
            method: 'get'
        })
        .then((data) => data.text())
        .then((text) => {
            let orientation = JSON.parse(text).value;
            return Promise.resolve(orientation);
        })
        .catch((err) => {
            console.log('request failed')
            console.log(err)
        })
    }

    //设置设备旋转状态
    /**
     * 传入的参数可选值：
     * PORTRAIT
     * LANDSCAPE
     * UIA_DEVICE_ORIENTATION_LANDSCAPERIGHT
     * UIA_DEVICE_ORIENTATION_PORTRAIT_UPSIDEDOWN 
    */
    setOrientation(orientation) {
        return fetch(this.deviceUrl + '/deviceControl/setOrientation', {
            method: 'post',
            body: JSON.stringify({
                orientation: orientation
            })
        })
        .then((data) => data.text())
        .then((text) => {
            let status = JSON.parse(text).status;
            let orientation = JSON.parse(text).value;
            console.log(text, orientation)
            if(status == 777) {
                console.log('cantChange')
                this.socket.emit('cantChange');
            }
            return Promise.resolve(orientation);
        })
        .catch((err) => {
            console.log('request failed')
            console.log(err)
        })
    }

    //输入 
    /**
     * value为字符数组 "value":
     * [
     * "h","t","t","p",":","/","/","g","i","t","h","u","b",".","c","o","m","\\n"
     * ] 
     */
    handleKeys(value) {
        console.log(value)
        fetch(this.deviceUrl + '/deviceControl/keys', {
            method: 'post',
            body: JSON.stringify({
                value: value
            })
        })
        .then((data) => {
            console.log('request success')
            console.log(data)
        }).catch((err) => {
            console.log('request failed')
            console.log(err)
        })
    }
}

module.exports = DeviceControl