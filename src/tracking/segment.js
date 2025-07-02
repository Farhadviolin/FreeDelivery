import analytics from 'analytics';
import segmentPlugin from '@analytics/segment';

const analyticsInstance = analytics({
  app: 'delivery-platform',
  plugins: [
    segmentPlugin({
      writeKey: process.env.SEGMENT_WRITE_KEY,
    })
  ]
});

// Beispiel: Page view
analyticsInstance.page('Home');

// Beispiel: Add to Cart
analyticsInstance.track('Add To Cart', {
  productId: 'p1',
  price: 9.99
});
export default analyticsInstance; 