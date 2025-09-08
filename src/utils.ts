export function ease(v: number, pow = 4) {
  return 1 - Math.pow(1 - v, pow)
}
