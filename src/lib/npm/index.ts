import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import { Worker } from "../worker";

export class NpmWorker extends Worker {
  constructor() { super('npm') }

  checkClient(pkg: string) {
    try {
      const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json')).toString());
      const dirs = readdirSync(join(process.cwd(), 'node_modules')).includes(pkg);
      return Object.keys((packageJson.dependencies || {})).includes(pkg) || dirs;
    } catch (error) {
      return false
    }
  }

  async install(pkg: string) {
    await this.run(`install ${pkg} --force`);
  }
}