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
            this.canvas.width = frame.image.width
            this.canvas.height = frame.image.height
            this.g.drawImage(frame.image, 0, 0)
        }
        this.next()
    }
}
