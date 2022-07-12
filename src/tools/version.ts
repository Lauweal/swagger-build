import semver from 'semver';
import { Logger } from './logger'
export const MIN_NODE_VERSION = '14.0.0';

export function isVersionValid(processVersion: string) {
  const version = processVersion.substr(1);
  return semver.satisfies(version, `>=${MIN_NODE_VERSION}`);
}

export function verificationNodeVersion(version: string) {
  if (!isVersionValid(version)) {
    Logger.error(`Paramecia至少需要Node.js v${MIN_NODE_VERSION}或更高，并且你已经安装了${version}，请升级你的Node.js发行版`, true);
  }
}