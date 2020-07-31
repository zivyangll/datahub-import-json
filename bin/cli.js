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
  .option('--mockSuffix <mockSuffix>', 'filter mock file with mockSuffix', {
    default: '.json',
  })
  .option('--interfaceSuffix <interfaceSuffix>', 'DataHub interface suffix', {
    default: '.json',
  })
  .option(
    '--replacePathWithDynamic <replacePathWithDynamic>',
    'replace path with dynamic',
    {
      default: '/_/',
    }
  )
  .option(
    '--mockRemoveSuffix <mockRemoveSuffix>',
    'replace mockRemoveSuffix to interfaceSuffix'
  )
  .option('--method <method>', 'DataHub interface method', {
    default: 'ALL',
  })
  .action(async (projectName, options) => {
    console.log('==============options============');
    console.log(options);
    console.log('=================================');

    await datahubImportJson({
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
