export function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}

export function getFooterCopy(isIndex) {
  if (isIndex === true) {
    return 'Holberton School';
  } else {
    return 'Holberton School main dashboard';
  }
}

// CommonJS compatibility for test runner
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getCurrentYear, getFooterCopy };
}