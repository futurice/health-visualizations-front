export function* entries(obj) {
   for (let key of Object.keys(obj)) {
     yield [key, obj[key]];
   }
}

export function parseDosages(dosages) {
  let parsed = Array.from(entries(dosages))
  parsed = parsed.sort( (a, b) => b[1] - a[1])
  return [["Dosage", "Count" ], ...parsed];
}
