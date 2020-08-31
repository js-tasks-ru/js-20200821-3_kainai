/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (string === '' || size === 0) return '';
  if (!size) return string;

  let newString = string[0];
  let count = 0;

  for (let i = 1; i < string.length; i++) {
    if (string[i] === string[i - 1]) {
      count += 1;
    } else {
      count = 0;
    }

    if (count < size) {
      newString += string[i];
    }
  }
  return newString;
}
