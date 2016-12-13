/**
 * @author  jessica(hzgujing@corp.netease.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';

import RenderLoop from './renderLoop'
import Pipeline from './pipeline'
import DeviceControl from '../../service/control'
import { getScrollTop } from '../../util/dom.js';

import deviceConfig from '../../config';


let deviceURL = deviceConfig.url; //定义设备接口地址

export default class ReadFrameRender extends React.Component {
    constructor(props) {
        super(props)
        this.deviceControl = new DeviceControl(deviceURL); 

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.stopMousing = this.stopMousing.bind(this);

        this.returnHome = this.returnHome.bind(this);                
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
        this.deviceControl.returnHome();
    }

    stopMousing() {
        let el = this.refs.screen;
        el.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('mouseleave', this.onMouseUp);
    }
    
    //单击事件
    onMouseDown(e) {
        let el = this.refs.screen;
        let rect = el.getBoundingClientRect();
        let x = e.pageX - rect.left;
        let y = e.pageY - rect.top - getScrollTop();
        this.deviceControl.handleMouseDown(x, y);
        el.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('mouseleave', this.onMouseUp);
    }

    onMouseMove(e) {
        console.log('mousemove ' + e)
    }

    onMouseUp(e) {
        console.log('mouseup ' + e)
        
        this.stopMousing();
        
    }

    componentDidMount() {
        this.openWebsocket()
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
            <div className="g-center">
                <canvas ref='screen' onMouseDown={this.onMouseDown}></canvas>
                <div className="f-tac">
                    <button className="u-btn-home" type='button' onClick={this.returnHome}>Home</button>
                </div>
            </div>
        )
    }
}