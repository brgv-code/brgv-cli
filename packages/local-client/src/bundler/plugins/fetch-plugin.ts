import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (contentFromUserInput: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: contentFromUserInput,
        };
      });

        build.onLoad({ filter: /.*/ }, async (args: any) => {
            const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
                args.path
              );
      
              if (cachedResult) {
                return cachedResult;
              }
        });
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        
        // if not , fetch the file from unpkg
        const { data, request } = await axios.get(args.path);
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = ` const style = document.createElement('style');
    style.innerText = '${escaped}';
    document.head.appendChild(style);`;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: contents,
          resolveDir: new URL("./", request.responseURL).pathname, // this is the path to the directory where the  last file is located
          // so if we have a file in a subdirectory, we can use this to resolve the relative paths in that file
          //'./' just to get the directory without the file name in react it is fetching from sub directory
        };
        await fileCache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        // if not cache, fetch the file from unpkg
        const { data, request } = await axios.get(args.path);
  
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname, // this is the path to the directory where the  last file is located
          // so if we have a file in a subdirectory, we can use this to resolve the relative paths in that file
          //'./' just to get the directory without the file name in react it is fetching from sub directory
        };
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
