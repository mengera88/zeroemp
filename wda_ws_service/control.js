/**
 * 控制真机接口wbsocket前端封装
 * @author  jessica(hzgujing@corp.netease.com)
 */


const controlInterface = require('./control_interface');

const url = 'http://localhost:3000'
const deviceUrl = 'http://localhost:8100'

const app = require('http').createServer(handler).listen(8080);





const socket = require('socket.io')(app, {origins: url});
socket.set('transports', ['websocket']);

socket.on('connection', (socket) => {
    console.log('socket.io connected')
    
    const ControlInterface = new controlInterface(deviceUrl, socket);


    socket.on('home', () => {
        ControlInterface.returnHome();
    });

    socket.on('click', (data) => {
        ControlInterface.handleClick(data.x, data.y);
    });

    socket.on('dbClick', (data) => {
        ControlInterface.handleDoubleClick(data.x, data.y);
    })

    socket.on('touchandhold', (data) => {
        ControlInterface.handleTouchAndHold(data.x, data.y, data.duration);
    })

    socket.on('drag', (data) => {
        ControlInterface.handleDrag(data.fromX, data.fromY, data.toX, data.toY, data.pressDuration, data.dragDuration);
    })

    socket.on('setOrientation', (data) => {
        ControlInterface.setOrientation(data.orientation);
    })

    socket.on('keydown', (data) => {
        ControlInterface.handleKeys(data.key);
    })
})

function handler(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}
