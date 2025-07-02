import CircuitBreaker from 'opossum';

export function createBreaker(fn) {
  const options = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 10000,
  };
  const breaker = new CircuitBreaker(fn, options);
  breaker.fallback(() => 'Service temporär nicht verfügbar');
  breaker.on('open', () => console.warn('Circuit Breaker geöffnet'));
  breaker.on('halfOpen', () => console.info('Circuit Breaker halb-offen'));
  breaker.on('close', () => console.info('Circuit Breaker geschlossen'));
  return breaker;
}
