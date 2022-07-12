import { Cli } from 'clipanion'
import { HelpCommand, VersionCommand, BuildCommand } from './commands';
import { verificationNodeVersion } from './tools';


verificationNodeVersion(process.version);

const [node, app, ...args] = process.argv;

const cli = new Cli({
  binaryLabel: 'swagger-build',
  binaryName: `${node} ${app}`,
  binaryVersion: require('../package.json').version,
});

cli.register(BuildCommand)
cli.register(VersionCommand)
cli.register(HelpCommand)
cli.runExit(args, Cli.defaultContext);

process.on('uncaughtException', (err) => {
  console.log(err)
  console.error(
    // eslint-disable-next-line max-len
    `uncaught exception, please report (https://github.com/verdaccio/verdaccio/issues) this: \n${err.stack}`
  );
  process.exit(1);
})
