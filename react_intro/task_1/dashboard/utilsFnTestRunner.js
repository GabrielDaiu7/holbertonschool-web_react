import { runTests } from './testUtilsFn.spec.js';

try {
  const ok = runTests();
  console.log(ok ? 'OK' : 'NOK');
} catch (err) {
  console.log('NOK');
}
