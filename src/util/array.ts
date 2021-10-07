import MersenneTwister from 'mersennetwister';

const mt = new MersenneTwister();

export function times<T>(i: T, times: number): T[] {
  return Array.from({ length: times }, () => i);
}

export function sample<T>(arr: T[]): T {
  return arr[Math.floor(mt.random() * arr.length)];
}

export function sampleMany<T>(array: T[], maximum: number = 1): T[] {
  return shuffle(array).slice(0, maximum);
}

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(mt.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function compose<T>(arg: T, ...fn: ((arg: T) => T)[]): T {
  return fn.reduce((arg, f) => f(arg), arg);
}
