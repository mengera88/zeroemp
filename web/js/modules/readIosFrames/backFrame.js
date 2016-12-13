/**
 * BackFrame stores the latest frame retrieved from the socket.
 * It does no other work and can be swapped at any time.
 * @author  jessica(hzgujing@corp.netease.com)
 */

export default class BackFrame {
    constructor() {
        this.blob = null
    }

    swap(blob) {
        this.blob = blob;
    }

    consume() {
        let blob = this.blob;
        this.blob = null;
        return blob;
    }
    
    destroy() {
        this.consume();
    }
}
