import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let esBuildService: esbuild.Service;

const bundle =  async (text: string) => {
if(!esBuildService) { // prevent multple instances of esbuild service from being created`
   esBuildService = await esbuild.startService({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
      });
    }
    try {

    const bundledCode = await esBuildService.build({
        entryPoints: ['index.js'],
        bundle: true, // bundle athe code into one file  
        write: false, // we don't want to write to a file we want to write to memory instead 
        plugins: [unpkgPathPlugin(),
                    fetchPlugin(text)], // we are passing our plugin to esbuild
        define: {
          'process.env.NODE_ENV': '"production"', // we are telling esbuild that we are in production mode
          global: 'window' // we are telling esbuild that we are in browser environment
        }
      });
      return { code: bundledCode.outputFiles[0].text, err: ''}
    } catch (error: any) {
        return {
            code: '',
            err: error.message

        }
    }

    };
    export default bundle;