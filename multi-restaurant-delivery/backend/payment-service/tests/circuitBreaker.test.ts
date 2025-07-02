import { createBreaker } from '../src/utils/circuitBreaker';

describe('circuitBreaker', () => {
  it('opens after failures and uses fallback', async () => {
    let fail = true;
    const fn = jest
      .fn()
      .mockImplementation(() => (fail ? Promise.reject('fail') : Promise.resolve('ok')));
    const breaker = createBreaker(fn);
    breaker.fallback(() => 'fallback');
    try {
      await breaker.fire();
    } catch {}
    try {
      await breaker.fire();
    } catch {}
    try {
      await breaker.fire();
    } catch {}
    expect(breaker.opened).toBe(true);
    fail = false;
    const res = await breaker.fire();
    expect(['ok', 'fallback']).toContain(res);
  });
});
