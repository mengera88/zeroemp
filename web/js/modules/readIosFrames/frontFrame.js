/**
 * FrontFrame takes a blob from the BackFrame and loads it into an image.
 * There are two FrontFrames. One is always loading the next image and one
 * is always being used to render the latest fully loaded image. They're
 * swapped once loading completes and the process repeats.
 * @author  jessica(gujing_hy@163.com)
 */
export default class FrontFrame {
    constructor(name) {
        this.name = name
        this.blob = null
        this.image = new Image()
        this.url = null
        this.loading = false
        this.loaded = false
        this.fresh = false

        this.onLoad = function () {
            this.loading = false
            this.loaded = true
            this.fresh = true
            // this.clean()
        }.bind(this)

        this.onError = function () {
            this.loading = false
            this.loaded = false
        }.bind(this)
    }

    load(blob) {
        // If someone's calling load() they're already sure that they don't need
        // the the current frame anymore.
        this.reset();
        
        // Convenience check that must come after the reset.
        if(!blob) {
            return;
        }

        this.blob = blob
        this.url = URL.createObjectURL(this.blob)
        this.loading = true
        this.loaded = false
        this.fresh = false
        this.image.onload = this.onLoad
        this.image.onerror = this.onError
        this.image.src = this.url
    }

    // clean() {
    //     this.image.onload = this.image.onerror = null;
    //     this.image.src = BLANK_IMG;
    //     this.image = null;
    //     this.blob = null;
    //     URL.revokeObjectURL(this.url);
    //     this.url = null;
    // }

    reset() {
        this.loading = false
        this.loaded = false
        if (this.blob) {
            this.blob = null
            URL.revokeObjectURL(this.url)
            this.url = null
        }
    }

    consume() {
        if (!this.fresh) {
            return null
        }

        this.fresh = false
        return this
    }

    destory() {
        this.reset()
        this.image = null
    } 
}
