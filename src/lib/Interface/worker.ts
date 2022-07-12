import { InterfaceQueue, IParameters } from "."
import { Logger } from "../../tools";

function getType(model: IParameters) {
  if (model.$ref) { model.type = 'object' }
  switch (model.type) {
    case 'array':
      return `${model.items?.originalRef ? model.items?.originalRef : getType(model.items as any)}`;
    case 'object':
      return `${model.originalRef}`;
    case 'integer':
      return 'number';
    default:
      return model.type;
  }
}

process.on('message', (msg: string) => {
  const { name, path, method, parameters, responses } = JSON.parse(msg) as InterfaceQueue;
  const paramsItems = (parameters || []).filter((p) => p.in === 'query');
  const paramsName = `${name.replace(name[0], name[0].toUpperCase())}Params`;
  const bodyItems = (parameters || []).filter((p) => p.in === 'body').map((b) => ({ ...b, ...b.schema }));
  const bodyName = bodyItems[0] ? getType(bodyItems[0]) : undefined;


  const query = paramsItems.length ? [`export interface ${paramsName} {\n`, ...paramsItems.reduce((a: string[], b) => {
    return a.concat([`${b.name}${!b.required ? '?' : ''}:${getType(b)}, ${b.description ? `// ${b.description}` : ''} \n`]);
  }, []), '}\n'].join("") : '';

  const paramsStr = paramsItems.length ? `params: ${name.replace(name[0], name[0].toUpperCase())}Params` : '';
  const bodyStr = bodyName ? `body: ${bodyName}` : '';
  const payload: string[] = [];
  const params: string[] = []
  if (method === 'get' || method === 'delete') {
    payload[0] = paramsStr ? 'params' : '';
    params[0] = paramsStr;
  }
  if (method === 'post' || method === 'put') {
    if (paramsStr) params[0] = paramsStr;
    if (bodyStr) params[1] = bodyStr;
    if (paramsStr) payload[1] = '{ params }';
    if (bodyStr) payload[0] = 'body';
  }

  if (typeof process.send === 'function') {
    Logger.log(`${method} ${path}`);
    process.send(JSON.stringify({
      data: bodyName,
      value: `${query} export function ${name}(${params.filter(Boolean).join(',')}):Promise<${responses}> {\n
        return client.${method}('${path}', ${payload.filter(Boolean).join(',')})
      }\n`
    }))
  }
})