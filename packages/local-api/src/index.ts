import express from 'express';
import  path  from 'path';
import { createCellsRouter } from './routes/cells';
import { createProxyMiddleware } from 'http-proxy-middleware';
const serve = (port: number, filename: string, dir: string, useProxy: boolean) => {
    const app = express();

   
    app.use(createCellsRouter(filename, dir)); // create a router for the cells route


    if(useProxy) {
        //if the user has installed the library in local machine, spin up the dev server and use the proxy middleware to forward requests to the local server
            // use the proxy middleware to forward requests to the local server
        app.use(createProxyMiddleware({ // createProxyMiddleware is a function that returns a middleware function  
            target: 'http://localhost:3000', // the local server 
            ws: true, // enable websockets 
            logLevel: 'silent' // disable logging
        }));
    } else {
        // if the app is running on a user's machine, and not in dev mode, serve the static files from the local-client package
        const localClientPackagePath = require.resolve('@brgv-cli/local-client/build/index.html');
        app.use(express.static(path.dirname(localClientPackagePath))); // serve the static files in the directory
    }

    

    return new Promise<void>((resolve, reject) => {
        //  if the server is running, resolve the promise and return the server instance 
        // if the server is not running, reject the promise and return the error message 
        app.listen(port, resolve).on('error', reject);
    });
 
};

export default serve;