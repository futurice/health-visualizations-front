function* entries(obj) {
   for (let key of Object.keys(obj)) {
     yield [key, obj[key]];
   }
}

export function objectToArray(obj) {
  let parsed = Array.from(entries(obj));
  return parsed.sort( (a, b) => b[1] - a[1]);
}

export function parse(dosages, labels, slice) {
  let arr = objectToArray(dosages);
  return [labels, ...arr].slice(0, slice);
}
