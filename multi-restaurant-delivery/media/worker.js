const { createWorker } = require('mediasoup');
async function run() {
  const worker = await createWorker();
  // configure router, transports, media codecs
}
run();
