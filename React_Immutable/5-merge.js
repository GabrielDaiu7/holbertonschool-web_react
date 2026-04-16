import { List as list, Map as map } from 'immutable';

export function concatElements(page1, page2) {
  return list(page1).concat(page2);
}

export function mergeElements(page1, page2) {
  return map(page1).merge(page2).toList();
}
