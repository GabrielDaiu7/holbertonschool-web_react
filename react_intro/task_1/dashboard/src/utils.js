export const getCurrentYear = () => new Date().getFullYear();

export const getFooterCopy = (isIndex) =>
  isIndex ? 'Holberton School' : 'Holberton School main dashboard';

const utils = (isIndex) => getFooterCopy(isIndex);
utils.getCurrentYear = getCurrentYear;
utils.getFooterCopy = getFooterCopy;

export default utils;
