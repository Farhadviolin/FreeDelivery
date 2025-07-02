export async function rateLimiter(redis, key) {
  const limit = 10;
  const window = 60; // seconds
  const current = await redis.incr(key);
  if (current === 1) await redis.expire(key, window);
  return current <= limit;
}
