
export const onlyChars = (value: string) => value.replace(/[^A-zА-яёЁ]/, '');
export const fioChars = (value: string) => value.replace(/[^A-zА-яёЁ \-]/, '');
export const onlyNumbers = (value: string) => value.replace(/\D/, '');
export const inn = (value: string) => onlyNumbers(value).substring(0, 12);
export const phone = (value: string) => onlyNumbers(value).substring(0, 10);
