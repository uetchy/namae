export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export function sampleFromArray<T>(array: T[], maximum: number): T[] {
  return shuffleArray(array).slice(0, maximum)
}

export function fillArray<T>(array: T[], filler: string, maximum: number): T[] {
  const deficit = maximum - array.length
  if (deficit > 0) {
    array = [...array, ...Array(deficit).fill(filler)]
  }
  return array
}

export function compose<T>(arg: T, ...fn: ((arg: T) => T)[]): T {
  return fn.reduce((arg, f) => f(arg), arg)
}
