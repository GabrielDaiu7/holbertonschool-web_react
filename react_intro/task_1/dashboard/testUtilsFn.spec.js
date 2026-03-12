import { getCurrentYear, getFooterCopy } from './src/utils.js';

export function runTests() {
  const year = getCurrentYear();
  const currentYear = new Date().getFullYear();

  if (year !== currentYear) return false;
  if (getFooterCopy(true) !== 'Holberton School') return false;
  if (getFooterCopy(false) !== 'Holberton School main dashboard') return false;

  return true;
}
