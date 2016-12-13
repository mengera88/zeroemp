const spawn = require('child_process').spawn;


class iosMinicapServer{
    constructor() {
        // let runSh = __dirname + '/build/ios_minicap \
        //             --udid $UDID \
        //             --port $PORT \
        //             --resolution $RESOLUTION';
        this.runIosServer = spawn(__dirname + '/run.sh', {cwd: __dirname})
        this.debug()
    }

    destroy() {
        let activeServer = this.runIosServer;
        activeServer.kill()
    }

    debug() {
        this.runIosServer.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        this.runIosServer.stderr.on('data', (data) => {
            console.log('has an error')
            console.log(`stderr: ${data}`);
        });

        this.runIosServer.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }
}


module.exports = iosMinicapServer;