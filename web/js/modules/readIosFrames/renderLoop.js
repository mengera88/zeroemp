/**
 * RenderLoop consumes and renders the pipeline.
 * @author  jessica(hzgujing@corp.netease.com)
 */
export default class RenderLoop {
    constructor(pipeline, canvas) {
        this.timer = null
        this.pipeline = pipeline
        this.canvas = canvas
        this.g = canvas.getContext('2d')
    }

    start() {
        this.stop()
        this.next()
    }

    stop() {
        cancelAnimationFrame(this.timer)
    }

    next() {
        this.timer = requestAnimationFrame(this.run.bind(this))
    }

    run() {
        let frame = this.pipeline.consume()
        if (frame) {
            let scale = 1;
            let maxLength = Math.max(frame.image.width, frame.image.height);
            if(maxLength > 1919 && maxLength < 1921) {//iPhone Plus
                scale = 2.6087
            }else {
                scale = 2
            }
            this.canvas.width = frame.image.width/scale
            this.canvas.height = frame.image.height/scale
            this.g.drawImage(frame.image, 0, 0, this.canvas.width, this.canvas.height)
        }
        this.next()
    }
}
