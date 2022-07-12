import { join } from 'path';
import { fstat, readdirSync, readFileSync, writeFileSync } from 'fs';
import install from 'npminstall';
import { AnalysisFunc, AnalysisType, IModelRef, Worker } from "..";
export type Method = 'delete' | 'post' | 'get' | 'put';

export interface InterfaceQueue {
  path: string;
  method: Method;
  name: string;
  parameters: IParameters[];
  responses: string;
  data?: string;
  body?: string;
}


export type IParametersModelType = 'object' | 'string' | 'array' | 'integer' | 'boolean';
export type IParametersType = 'query' | 'body';
export interface IParameters extends IModelRef {
  in: IParametersType;
  description: string;
  name: string;
  required: boolean;
  type: IParametersModelType;
  items?: IModelRef;
  schema?: IModelRef;
}
export interface IResponsesParams {
  schema?: IModelRef;
  description?: string;
}
export interface InterfaceBody {
  consumes: string[];
  parameters: IParameters[];
  responses: Record<string, IResponsesParams>;
}

export class Interface extends Worker {
  constructor(private readonly interfaces: Record<string, Record<Method, InterfaceBody>>) { super(join(__dirname, 'worker.js')); }
  private analysisFunc: Partial<Record<AnalysisType, AnalysisFunc>> = {};
  private queue: InterfaceQueue[] = [];

  public title(func: AnalysisFunc) {
    this.analysisFunc.title = func;
    return this;
  }

  private isChinese(str: string) {
    return /[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(str);
  }

  private name(method: Method, path: string) {
    return [method, ...path.split('/').filter(Boolean).map((p) => p.split('-')).flat().map((p) => p.replace(p[0], p[0].toUpperCase()))].join('');
  }

  private initial() {
    this.queue = Object.entries(this.interfaces).reduce<InterfaceQueue[]>((a, b) => {
      const [path, body] = b;
      return Object.entries(body).reduce<InterfaceQueue[]>((c, d) => {
        const [method, data] = d;
        const res = data!.responses![200];
        if (!res || !res.schema?.originalRef || this.isChinese(res.schema?.originalRef)) return c;
        let name = data!.responses![200].schema?.originalRef as string;
        if (typeof this.analysisFunc.title === 'function') {
          name = this.analysisFunc.title(name);
        }
        if (c.find((a) => a.name == this.name(method as Method, path))) return c;
        c.push({ name: this.name(method as Method, path), path, method: method as Method, parameters: data.parameters, responses: name });
        return c;
      }, a)
    }, []);
  }

  private importInterface() {
    const _interfaces = Array.from(new Set([...this.queue.filter((q) => !!q.data).map((q) => q.data), ...this.queue.filter((q) => !!q.responses).map((q) => q.responses)]));
    if (!_interfaces.length) return '';
    return `import {${_interfaces.join(',\n')}} from "./interface";\n`;
  }

  public async build() {
    this.initial();

    this.queue = await Promise.all(this.queue.map((q) => {
      return this.run<any>(q).then((v) => { q.body = v.value; q.data = v.data; return q });
    }));
  }

  public async write(path: string) {
    writeFileSync(join(path, 'api.ts'), `${this.importInterface()}${this.queue.reduce((a, b) => a += b.body, 'import client from "./client";\n')}export default {\n ${this.queue.map((q) => q.name).join(',\n')}}\n;`);
    writeFileSync(join(path, 'client.ts'), 'import { HttpClient } from "http-platform";\n const client = new HttpClient({ host: "" });\n export default client;\n');
    writeFileSync(join(path, 'index.ts'), 'export {default as httpClient} from "./client";\nexport * from "./interface";\nexport {default as api} from "./api";');
  }
}