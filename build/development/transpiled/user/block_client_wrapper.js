
var ReactDOM = require('react-dom');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

window['_airtableReact'] = React;
window['_airtableReactDOM'] = ReactDOM;
window['_airtableReactDOMServer'] = ReactDOMServer;

var didRun = false;
window['_airtableRunBlock'] = function runBlock() {
    if (didRun) {
        console.log('Refusing to re-run block');
        return;
    }
    didRun = true;
    
        var blockUrl = process.env.BLOCK_BASE_URL;

        // Make requests to local backend.
        var baseTag = document.createElement('base');
        baseTag.setAttribute('href', blockUrl);
        document.head.appendChild(baseTag);
        
    // Requiring the entry point file runs user code. Be sure to do any setup
    // above this line.
    require("/Users/yoann/Documents/blackflow/backend/block/stats/build/development/transpiled/user/frontend/index.js");
};
