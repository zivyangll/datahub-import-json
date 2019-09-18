#!/usr/bin/env node

const cli = require('cac')();
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const datahubImportJson = require('../lib/index');

updateNotifier({
  pkg,
  updateCheckInterval: 5000, // 5s
}).notify();

cli
  .command('<projectName>', 'Generate a new project to Datahub')
  .option('-d, --mock-dir <mockDir>', 'mock dir')
  .option('-s, --server <server>', 'DataHub server address', {
    default: 'http://127.0.0.1:5678',
  })
  .option('--mockSuffix <mockSuffix>', 'set mock file suffix', {
    default: '.json',
  })
  .option('--interfaceSuffix <interfaceSuffix>', 'DataHub interface suffix', {
    default: '.json',
  })
  .action(async (projectName, options) => {
    console.log('==============options============');
    console.log(options);
    console.log('=================================');

    datahubImportJson({
      projectName,
      ...options,
    });
  });

cli.on('command:!', () => {
  if (!cli.args.length) cli.outputHelp();
});

cli.help();
cli.version(require('../package').version);
cli.parse();
