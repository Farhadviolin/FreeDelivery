// setup_ab.js
const optimizely = require('@optimizely/optimizely-sdk');
const client = optimizely.createInstance({ sdkKey: process.env.OPTIMIZELY_SDK_KEY });

client.onReady().then(() => {
  client.createExperiment({ 
    experimentKey: 'new_checkout_flow', 
    variations: ['old', 'new'], 
    audienceCondition: 'user.is_paying == true' 
  });
  console.log('A/B experiment setup complete.');
});
