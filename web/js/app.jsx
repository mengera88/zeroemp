/**
 * App Entry 应用程序入口
 * @author  jessica(hzgujing@corp.netease.com)
 */

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

import fetch from 'whatwg-fetch';
if (!window.fetch) {
    window.fetch = fetch;
}


import React from 'react';
import ReactDOM from 'react-dom';
import ReadFrameRender from './modules/readIosFrames/readFrameRender.jsx';

class App extends React.Component {
    render() {
        return (
            <div>
                <ReadFrameRender />
            </div>
        )
    }
} 
ReactDOM.render(
    <App />,
    document.getElementById('root')
)