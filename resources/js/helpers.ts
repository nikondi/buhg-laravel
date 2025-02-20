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


export function number_format(number: number, decimals = 0, dec_point = '.', thousands_sep = ',' ) {

  let sign = number < 0 ? '-' : '';

  // @ts-ignore
  let s_number = Math.abs(parseInt(number = (+number || 0).toFixed(decimals))) + "";
  let len = s_number.length;
  let tchunk = len > 3 ? len % 3 : 0;

  let ch_first = (tchunk ? s_number.substring(0, tchunk) + thousands_sep : '');
  let ch_rest = s_number.substring(tchunk)
    .replace(/(\d\d\d)(?=\d)/g, '$1' + thousands_sep);
  let ch_last = decimals ?
    dec_point + (Math.abs(number) - parseFloat(s_number))
      .toFixed(decimals)
      .slice(2) :
    '';

  return sign + ch_first + ch_rest + ch_last;
}
