export function capitalize(text: string): string {
  if (text.length === 0) return '';
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

export function sanitize(text: string): string {
  return text
    .replace(/[@+!#$%^&*()[\]./<>{}]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export interface NormalizeOptions {
  alphanumeric?: boolean;
  allowSpaces?: boolean;
  allowUnderscore?: boolean;
  allowHyphens?: boolean;
}

export function normalize(
  text: string,
  {
    alphanumeric = true,
    allowSpaces = false,
    allowUnderscore = true,
    allowHyphens = true,
  }: NormalizeOptions = {}
): string {
  if (alphanumeric) {
    text = text.replace(/[^0-9a-zA-Z-_\s]/g, '');
  }
  if (!allowUnderscore) {
    text = text.replace(/_/g, '-');
  }
  if (!allowHyphens) {
    text = text.replace(/-/g, allowUnderscore ? '_' : ' ');
  }
  if (!allowSpaces) {
    text = text.replace(/\s/g, '');
  }
  text = text.replace(/[-_\s]+$/, '');
  return text;
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

export function njoin(
  lhs: string,
  rhs: string,
  { elision = true }: { elision?: boolean } = {}
): string {
  return elision
    ? lhs + rhs.replace(new RegExp(`^${lhs[-1]}`, 'i'), '')
    : lhs + rhs;
}
