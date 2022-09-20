export function makeMap(str) {
  const map = str
    .split(',')
    .reduce((map, item) => ((map[item] = true), map), Object.create(null));
  return (val) => !!map[val];
}

export const no = (a, b, c) => false
