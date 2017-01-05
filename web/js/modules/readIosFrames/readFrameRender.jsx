/**
 * @author  jessica(hzgujing@corp.netease.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import RenderLoop from './renderLoop'
import Pipeline from './pipeline'
import { getScrollTop } from '../../util/dom.js';
import SocketService from '../../service/socket'

import deviceConfig from '../../config';


const DOUBLECLICKTIME = 500;
const LONGCLICKTIME = 500;
let socketURL = deviceConfig.socketUrl; //定义socket接口地址

export default class ReadFrameRender extends React.Component {
    constructor(props) {
        super(props);

        this.startTime = null;      // 鼠标按下时的时间
        this.endTime = null;        // 鼠标松开时的时间
        this.clickTime = null;      // 存储一次单击的时间
        this.startPoint = null;     // 存储鼠标按下时的坐标
        this.endPoint = null;       // 存储鼠标送开始的坐标
        this.clickPoint = null;     // 存储鼠标单击时的坐标
        this.isMoveTriggered =false;// 判断是否出发了mousemove函数
        this.clickType = null;      // 存储鼠标行为类别
        this.moveTime = null;       // 存储开始move的时间
        this.isMovedTimeComputed = false;  //是否是第一次move
        this.orientation = "PORTRAIT";    // 存储旋转方向信息
        
        this.socket = io(socketURL, {transports: ['websocket', 'polling', 'flashsocket']});
        

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.stopMousing = this.stopMousing.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleTouchAndHold = this.handleTouchAndHold.bind(this);
        this.handleClickType = this.handleClickType.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.setOrientation = this.setOrientation.bind(this);
        this.returnHome = this.returnHome.bind(this);
        this.handleKeys = this.handleKeys.bind(this); 

    }
    
    //读取屏幕信息
    openWebsocket() {
        let pipeline = new Pipeline();
        let canvas = this.refs.screen;
        let renderLoop = new RenderLoop(pipeline, canvas);

        let ws = new WebSocket('ws://localhost:3000', 'minicap');
        this.ws = ws;
        ws.binaryType = 'blob';
        ws.onclose = function() {
            console.log('onclose', arguments)
            renderLoop.stop()
        }

        ws.onerror = function() {
            console.log('onerror', arguments)
            renderLoop.stop()
        }

        ws.onmessage = function(message) {
            // console.log(message)
            var blob = new Blob([message.data], {
                    type: 'image/jpeg'
            })
            pipeline.push(blob)
        }

        ws.onopen = function() {
            console.log('onopen', arguments)
            ws.send('1920x1080/0')
            renderLoop.start()
        }
    }
    
    //返回home键
    returnHome() {
        this.socket.emit('home');
    }

    //处理keys
    handleKeys(e) {
        let key = [];
        if(e.keyCode == 8) { //删除键
            key.push('\b');
        } else if(e.keyCode == 13) {
            key.push('\r');
        } else if(e.shiftKey) {
            key.push('');
        } else {
            key.push(e.key);
        }
        
        this.socket.emit('keydown', {key: key});
    }
    
    //获取设备旋转状态
    getOrientatioin() {
        this.socket.emit('getOrientation', (data) => {
            this.orientation = data;
        });
    }

    //设置设备旋转
    setOrientation() {
        let orientation;
        console.log(this.orientation);
        if(this.orientation == 'PORTRAIT') {
            orientation = 'LANDSCAPE';
            this.orientation = 'LANDSCAPE';
        } else if(this.orientation == 'LANDSCAPE') {
            orientation = 'PORTRAIT';
            this.orientation = 'PORTRAIT'
        }
        this.socket.emit('setOrientation', {orientation: orientation});
        this.socket.on('cantChange', () => {
            alert('Sorry, but this page can not change orientation!');
        })
    }

    stopMousing() {
        let el = this.refs.screen;

        this.clickType = null;
        this.isMoveTriggered = false;
        this.isMovedTimeComputed = false;

        el.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('mouseleave', this.onMouseUp);
    }
    
    //单击事件
    onMouseDown(e) {
        e.preventDefault();
        let el = this.refs.screen;
        this.refs.keyinput.focus();
        let rect = el.getBoundingClientRect();
        let x = e.pageX - rect.left;
        let y = e.pageY - rect.top - getScrollTop();
        this.startTime = Date.now();
        this.startPoint = [x, y];
        el.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('mouseleave', this.onMouseUp);
    }

    onMouseMove(e) {
        e.preventDefault();
        this.isMoveTriggered = true;
        if(!this.isMovedTimeComputed) {
            this.moveTime = Date.now();
            this.isMovedTimeComputed = true;
        }
    }

    onMouseUp(e) {
        e.preventDefault();
        let el = this.refs.screen;
        let rect = el.getBoundingClientRect();
        this.endTime = Date.now();
        let x = e.pageX - rect.left;
        let y = e.pageY - rect.top - getScrollTop();
        this.endPoint = [x, y];
        let timeDis = this.endTime - this.startTime;
        if(this.isMoveTriggered) { //为拖拽
            console.log('drag')
            this.clickType = 'drag';
        } else if(timeDis < LONGCLICKTIME && !this.isMoveTriggered) { //则为单击
            console.log("click")
            this.clickType = 'click';
        }
        
        if(timeDis > LONGCLICKTIME && this.isInRange(this.startPoint, this.endPoint, 5)) {//则为长按
            console.log('touchandhold')
            this.clickType = 'touchandhold';
        }

        if(this.clickType == 'click') {
            let currentTime = Date.now();
            if(this.clickTime 
               && currentTime - this.clickTime <= DOUBLECLICKTIME
               && this.isInRange(this.endPoint, this.clickPoint, 5)) {
                console.log('doubleclick')
                this.clickTime = null;
                this.clickType = 'doubleclick';
               } else {
                this.clickTime = currentTime;
                this.clickPoint = this.endPoint;
            }
        }
        
        this.handleClickType();
        //取消事件绑定
        this.stopMousing();
        
    }

    //计算距离
    isInRange(startPoint, endPoint, threshold) {
        let deltaX = parseFloat(endPoint[0]) - parseFloat(startPoint[0]);
        let deltaY = parseFloat(endPoint[1]) - parseFloat(startPoint[1]);

        return Math.pow(deltaX, 2) + Math.pow(deltaY, 2) <= Math.pow(threshold, 2);
    }

    //判断鼠标行为类别
    handleClickType() {
        switch(this.clickType) {
            case 'click': 
                  this.handleClick(this.startPoint[0], this.startPoint[1]); break;
            case 'touchandhold': 
                  this.handleTouchAndHold(this.startPoint[0], this.startPoint[1], this.endTime - this.startTime); break;
            case 'doubleclick':
                  this.handleDoubleClick(this.endPoint[0], this.endPoint[1]); break;
            case 'drag':
                  this.handleDrag(this.startPoint[0], this.startPoint[1], this.endPoint[0], this.endPoint[1], this.moveTime - this.startTime, this.endTime - this.moveTime); break;
        }
    }

    //处理单击事件
    handleClick(x, y) {
        this.socket.emit('click', {x: x, y: y});
    }
    
    //长按
    handleTouchAndHold(x, y, duration) {
        this.socket.emit('touchandhold', {x: x, y: y, duration: duration});
    }
    
    //双击
    handleDoubleClick(x, y) {
        this.socket.emit('dbClick', {x: x, y: y});
    }

    //拖拽
    handleDrag(fromX, fromY, toX, toY, pressDuration, dragDuration) {
        this.socket.emit('drag', {fromX: fromX, fromY: fromY, toX: toX, toY: toY, pressDuration: pressDuration, dragDuration: dragDuration});
    }

    componentDidMount() {
        this.openWebsocket();
        this.getOrientatioin();                       
    }

    componentWillMount() {
    }

    componentWillUnmount() {
        let ws = this.ws;
        ws.onclose = ws.onerror = ws.onmessage = ws.onopen = null;
        ws.close();
        ws = null;
        pipeline.destroy();
    }

    render() {
        return (
            <div className="u-h700 f-tac">
                <input className="m-input-hide" type="text" name="ddd" ref='keyinput' onKeyDown={this.handleKeys} />
                <canvas className="f-ib" ref='screen' onMouseDown={this.onMouseDown}></canvas>
                <div className="f-tac">
                    <button className="u-btn-home u-mgr20" type='button' onClick={this.returnHome}>Home</button>
                    <button className="u-btn-home" type='button' onClick={this.setOrientation}>旋转</button>
                </div>
            </div>
        )
    }
}