addEventListener('fetch', event => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  const cacheUrl = new URL(request.url);
  const cacheKey = new Request(cacheUrl.toString(), request);
  const cache = caches.default;

  // Try edge cache
  let response = await cache.match(cacheKey);
  if (!response) {
    // Fetch from origin
    response = await fetch(request);
    // Rewrite Cache-Control for dynamic content
    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'public, max-age=60');
    response = new Response(response.body, { status: response.status, headers });
    // Store in edge cache
    event.waitUntil(cache.put(cacheKey, response.clone()));
  }
  // Ensure Brotli compression
  const encodings = request.headers.get('Accept-Encoding') || '';
  if (encodings.includes('br')) {
    response = new Response(response.body, response);
    response.headers.set('Content-Encoding', 'br');
  }
  return response;
}
