/**
 * SocketService 真机控制Socket服务
 * @author  jessica(gujing_hy@163.com)
 */

import { remove } from '../util';
import assign from 'lodash/assign';
import io from 'socket.io-client';

class SocketService {
    /**
     * 创建 SocketService
     * @param   {String}    url WebSocket链接
     * @param   {Object}    options Socket.io配置，参见 http://socket.io/docs/client-api/
     */
    constructor(url, options) {
        this.socket = io(url, assign({
            reconnection: false,
            transports: ['websocket']
        }, options));
        this.listeners = [];
    };
    /**
     * 注册socket事件
     * @param   {String}    event   事件名称
     * @param   {Function}  listener    事件处理函数
     * @returns {SocketService} 返回this，以便链式调用
     */
    on(event, listener) {
        this.listeners.push({
            event: event,
            listener: listener
        });
        this.socket.on(event, listener);
        return this;
    };
    /**
     * 触发特定类型的事件
     * @param   {String}    event   事件名称
     */
    emit(event) {
        this.socket.emit.apply(this.socket, arguments);
    };
    /**
     * 移除注册的socket事件处理
     * @param   {String}    event   事件名称
     * @param   {Function}  listener    事件处理函数
     * @returns {SocketService} 返回this，以便链式调用
     */
    removeListener(event, listener) {
        remove(this.listeners, listener);
        this.socket.removeListener(event, listener);
        return this;
    };
    /**
     * 关闭WebSocket连接并清除注册的事件
     */
    close() {
        this.listeners.forEach(listener => {
            this.socket.removeListener(listener.event, listener.handler)
        });
        this.socket.close();
    };
}
export default SocketService;