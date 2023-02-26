#!/usr/bin/env node
import { program } from 'commander';
import { serveCommand } from './commands/serve';

program.addCommand(serveCommand);

program.parse(process.argv);

// FEATURE npx nx graph shows the visual representation of the dependency graph of the project
// FEATURE use yargs library to parse command line arguments just like vite does
// FEATURE use commander library to parse command line arguments just like vite does
// FEATURE use chalk library to color the output of the command line just like vite does
// FEATURE use ora library to show a spinner while the command is running just like vite does
// FEATURE use inquirer library to ask questions to the user just like vite does
// FEATURE use boxen library to show a box around the output just like vite does
// FEATURE use update-notifier library to notify the user if there is a new version of the package just like vite does
// FEATURE use node-fetch library to make http requests just like vite does

