import { IModel } from "."

function getType(model: IModel) {
  if (model.$ref) { model.type = 'object' }
  switch (model.type) {
    case 'array':
      return `${model.items?.originalRef ? `${model.items?.originalRef}[]` : `any[]`}`;
    case 'object':
      return `${model.originalRef}`;
    case 'integer':
      return 'number';
    default:
      return model.type;
  }
}

process.on('message', (msg: string) => {
  const { name, body } = JSON.parse(msg) as { name: string, body: IModel };
  const { properties } = body;
  const code = Object.entries(properties).reduce((a, b) => {
    const [key, model] = b
    a[key] = getType(model);
    return a
  }, {})
  if (typeof process.send === 'function') {
    process.send(JSON.stringify(code))
  }
})