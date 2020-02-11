export function capitalize(text: string): string {
  if (text.length === 0) return '';
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

export function sanitize(text: string): string {
  return text
    .replace(/[\s@+!#$%^&*()[\]./<>{}]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function upper(word: string): string {
  return word.toUpperCase();
}

export function lower(word: string): string {
  return word.toLowerCase();
}

export function stem(word: string): string {
  return word.replace(/[aiueo]$/, '');
}

export function germanify(word: string): string {
  return word.replace('c', 'k').replace('C', 'K');
}

export function njoin(lhs: string, rhs: string): string {
  return lhs + rhs.replace(new RegExp(`^${lhs[-1]}`, 'i'), '');
}
