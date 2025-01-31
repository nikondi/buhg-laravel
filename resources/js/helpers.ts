export function mergeClass(...args: (string | string[] | {[k: string]: boolean|null})[]) {
  const className: string[] = [];
  args.forEach((cl) => {
    if(!cl)
      return true;
    if(Array.isArray(cl))
      className.push(...cl);
    else if(typeof cl == 'object')
      Object.entries(cl).forEach(([key, expression]) => expression && className.push(key))
    else if(typeof cl == 'string')
      className.push(cl);
  });

  return className.join(' ');
}


