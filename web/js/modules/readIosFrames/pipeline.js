/**
 * @author  jessica(hzgujing@corp.netease.com)
 */

import BackFrame from './backFrame';
import FrontFrame from './frontFrame';

export default class Pipeline {
    constructor() {
        this.back = new BackFrame();
        this.mid = new FrontFrame('mid');
        this.front = new FrontFrame('front');
    }

    push(blob) {
        this.back.swap(blob)
        // If the mid frame isn't loading or waiting to be consumed, let's
        // ask it to load this new frame to speed up things.
        if (!this.mid.loading && !this.mid.loaded) {
            this.mid.load(this.back.consume())
        }
    }

    consume() {
        if (this.mid.loaded) {
            const mid = this.mid
            this.mid = this.front
            this.front = mid
            this.mid.load(this.back.consume())
        } else if (!this.mid.loading) {
            this.mid.load(this.back.consume())
        }

        return this.front.consume()
    }

    destroy() {
        this.back.destroy()
        this.mid.destroy()
        this.front.destroy()
    }
}
