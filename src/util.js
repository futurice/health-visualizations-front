export const URL = 'http://localhost:5000/'

function* entries(obj) {
   for (let key of Object.keys(obj)) {
     yield [key, obj[key]];
   }
}

export function objectToArray(obj) {
  let parsed = Array.from(entries(obj));
  return parsed.sort( (a, b) => b[1] - a[1]);
}

export function parse(obj, labels) {
  let arr = objectToArray(obj);
  return [labels, ...arr];
}

// Returns associations with more than minCount samples
export function parseAssociations(associations, labels, slice=20, minCount=30) {
  let data = Object.keys(associations)
    .filter( (e) => associations[e].count >= minCount) 
    .map( (e) => [e, associations[e].value])
    .sort( (a, b) => b[1] - a[1])
    .slice(0, slice);

    return [labels, ...data];
}