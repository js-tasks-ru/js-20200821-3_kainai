/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const compare = (a, b) => a.localeCompare(b, undefined, { caseFirst: 'upper' });

  return arr.slice().sort((a, b) => {
    return param === 'desc' ? compare(b, a) : compare(a, b);
  });
}
