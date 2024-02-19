export function getRandomFromArray<T>(arr: T[], count: number) {
  var result = new Array(count),
    len = arr.length,
    taken = new Array(len);
  if (count > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (count--) {
    var x = Math.floor(Math.random() * len);
    result[count] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export function randomInt(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}
