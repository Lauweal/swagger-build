import axios from "axios";
import { Command, Option } from "clipanion";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { Interface, Model, NpmWorker } from "../lib";

export class BuildCommand extends Command {
  static paths = [['build']]

  private url = Option.String('-p,--path', { required: true, description: '接口请求地址或者配置' })
  private output = Option.String('-o,--output', { required: true, description: '输出位置' })

  private isFilePath(path: string) {
    return /^[A-z]:\\\\(.+?\\\\)*$/.test(path)
  }

  private buildApiFormConfig() {

  }

  private async buildApiFormUrl() {
    const config = await axios.request({ url: this.url }).then((v) => v.data).catch(() => null);
    const _model = new Model(config.definitions);
    const _interface = new Interface(config.paths);
    const _npm = new NpmWorker();
    const dir = join(process.cwd(), this.output);
    if (!existsSync(dir)) { mkdirSync(dir, { recursive: true }) }
    if (!_npm.checkClient('http-platform')) {
      await _npm.install('http-platform')
    }
    _model.title((str) => {
      return str.replace(/«/g, '').replace(/»/g, '');
    });
    _interface.title((str) => {
      return str.replace(/«/g, '').replace(/»/g, '');
    });
    await _model.build();
    await _interface.build();
    _interface.write(dir);
    _model.write(dir);
  }

  async execute(): Promise<number | void> {
    if (this.isFilePath(this.url)) {
      return this.buildApiFormConfig();
    }
    return this.buildApiFormUrl();
  }

}