import { Map } from 'immutable';

export default function accessImmutableObject(object, array) {
  return Map(object).getIn(array);
}
