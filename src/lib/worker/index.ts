import { ChildProcess, fork, spawn, SpawnOptions } from "child_process";
import { extname } from "path";
import { Logger } from "../../tools";
export abstract class Worker {
  constructor(protected binary: string) { }

  protected async runScript(command: string,
    collect = false,
    cwd: string = process.cwd(),) {
    return new Promise<null | string>((resolve, reject) => {
      const args: string[] = [command];
      const options: SpawnOptions = {
        cwd,
        stdio: collect ? 'pipe' : 'inherit',
        shell: true,
      };
      const child: ChildProcess = spawn(
        `${this.binary}`,
        [...args],
        options,
      );
      if (collect) {
        child.stdout!.on('data', (data) =>
          resolve(data.toString().replace(/\r\n|\n/, '')),
        );
      }
      child.on('close', (code) => {
        if (code === 0) {
          resolve(null);
        } else {
          Logger.error('error');
          reject();
        }
      });
    });
  }

  protected async runWorker<R = any>(params: Record<string, any>): Promise<R | undefined> {
    const child = fork(this.binary);
    return new Promise<R | undefined>((resolve, reject) => {
      child.send(JSON.stringify(params));
      child.on('message', (msg: string) => {
        child.disconnect();
        if (!msg) return resolve(undefined);
        return resolve(JSON.parse(msg));
      })
    })
  }

  protected async run<R = any>(params: Record<string, any> | string): Promise<R | undefined> {
    if (extname(this.binary)) {
      return this.runWorker(params as Record<string, any>);
    }
    return this.runScript(params as string) as any;
  }
}