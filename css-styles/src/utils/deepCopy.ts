export function deepCopy(obj: {} | Array<any>) {
  return JSON.parse(JSON.stringify(obj));
}
