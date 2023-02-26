import { Command } from 'commander' 
import  serve  from '@brgv-cli/local-api';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
export const serveCommand = new Command()
    .command('serve [filename]') // [filename] is an optional argument
    .option('-p, --port <number>', 'port to run server on', '5173') // -p is a short option, --port is a long option (both are optional) and <number> is the argument type (optional) and '5173' is the default value (optional) 
    .description('Open a file for editing' )
    .action((filename = 'notebook.js', options: {port: string}) => {
        try {
        const dir = path.join(process.cwd(), path.dirname(filename));
        serve(parseInt(options.port), path.basename(filename), dir, !isProduction);
        console.log(`opened ${filename}. Navigate to http://localhost:${options.port} to edit the file. `)    } 
    catch (err: any) {
        if (err.code === 'EADDRINUSE') {
            console.error('Port is in use. Try running on a different port.');
            // if the port is in use, suggest the user to run on a different port 
            // FEATURE find the port number in the error message and suggest the user to run on a different port

        } 
        else {
            console.log('Heres the problem', err.message);
        }
        // process exits with a non-zero exit code to indicate that the program failed 
        process.exit(1);


    }
}
);


export const publishCommand = new Command()
    .command('publish [filename]')
    .description('Publish a package to npm')
    .action((filename = 'notebook.js') => {
        console.log('Publishing', filename);
    }
);




