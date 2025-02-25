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
export function formatPrice(price: string|number) {
  if(typeof price == 'string')
    price = parseFloat(price);

  let result = number_format(price, 2, '.', ' ');
  if(result.endsWith('.00'))
    result = result.substring(0, result.length - 3);

  return result;

}


export function formatPhone(phone: string) {
  if(!phone)
    return;
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match)
    return '+7 (' + match[1] + ') ' + match[2] + '-' + match[3] + '-' + match[4];
  return '+7 '+phone;
}

export function formatDate(date: string) {
  const date_obj = new Date(date)
  return date_obj.toLocaleDateString('ru-RU');
}

export function copyToClipboard(textToCopy: string) {
  // Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // Use the 'out of viewport hidden text area' trick
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;

    // Move textarea out of the viewport so it's not visible
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";

    document.body.prepend(textArea);
    return new Promise((resolve, reject) => {
      textArea.select();

      try {
        document.execCommand('copy');
        resolve('success');
      } catch (error) {
        reject(error);
      } finally {
        textArea.remove();
      }
    })
  }
}
