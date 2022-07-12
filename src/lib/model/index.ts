import { join } from 'path';
import { writeFileSync } from 'fs';
import { Worker } from "..";

interface ModelQueue {
  title: string;
  name: string;
  body?: Record<string, string>;
}

export interface IModelRef {
  $ref?: string;
  originalRef?: string;
}
export type ModelType = 'object' | 'string' | 'array' | 'integer' | 'boolean';
export interface IModel extends IModelRef {
  title: string;
  type: ModelType;
  properties: Record<string, IModel>;
  format?: string;
  items?: IModelRef;
  description?: string;
}
export type AnalysisType = 'title';
export type AnalysisFunc = (str: string) => string;

export class Model extends Worker {
  constructor(private readonly models: Record<string, IModel>) { super(join(__dirname, 'worker.js')); }
  private analysisFunc: Partial<Record<AnalysisType, AnalysisFunc>> = {};
  private queue: ModelQueue[] = [];

  public title(func: AnalysisFunc) {
    this.analysisFunc.title = func;
    return this;
  }

  private isChinese(str: string) {
    return /[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(str);
  }

  private initial() {
    Object.entries(this.models).reduce((a, b) => {
      const [_, body] = b;
      if (this.isChinese(body.title)) return a;
      let name = body.title;
      if (typeof this.analysisFunc.title === 'function') {
        name = this.analysisFunc.title(body.title);
      }
      a.push({ name, title: body.title })
      return a;
    }, this.queue);
  }

  public async build() {
    this.initial();
    this.queue = await Promise.all(this.queue.map((q) => this.run<any>({ name: q.name, body: this.models[q.title] }))).then((value) => {
      return this.queue.map((q, idx) => {
        return { body: value[idx], ...q };
      });
    });
  }

  public write(path: string) {
    const code = this.queue.reduce((a, b) => {
      const { name, body, title } = b
      return `${a}\nexport interface ${name} {\n${Object.entries(body!).reduce((a, b) => {
        let type = b[1];
        if (typeof this.analysisFunc.title === 'function') {
          type = this.analysisFunc.title(type);
        }
        const description = this.models[title].properties[b[0]].description;
        return `${a}${b[0]}:${type}, ${description ? `// ${description}` : ''} \n`
      }, '')}}`
    }, '');
    writeFileSync(join(path, 'interface.ts'), code);
  }
}