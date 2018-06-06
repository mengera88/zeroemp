/**
 * Utilities
 * @module  utils
 * @author  jessica(gujing_hy@163.com)
 */

'use strict';

/**
 * 移除数组中一项
 * @param   {Array} arr 数组对象
 * @param   {*}     o   要移除的数组项目
 * @returns {*} 返回移除的元素
 */
export function remove(arr, o) {
    var el = null;
    var index = arr.indexOf(o);
    if (index != -1) {
        el = arr.splice(index, 1);
        el = el.length ? el[0] : null;
    }
    return el;
};


/**
 * 创建一个拥有特定名称的日志格式话输出函数
 * @param   {String}    name    日志名称
 * @returns {Function}
 */
export function logger(name) {
    return function () {
        let args = Array.prototype.slice.call(arguments);
        console.log(name + ':', ...args);
    }
};

/**
 * 产生范围数据
 * @param   {Number}    start   起始数字
 * @param   {Number}    end     结束数字
 * @returns {Array} 返回产生的数组
 */
export function range(start, end) {
    let result = [];
    let reverse = start > end;
    if (start === end) {
        result.push(start);
    } else {
        if (reverse) {
            let tmp = start;
            start = end;
            end = tmp;
        }
        for (let i = start; i < end; i++) {
            result.push(i);
        }
    }
    if (reverse) {
        result = result.reverse();
    }
    return result;
};
