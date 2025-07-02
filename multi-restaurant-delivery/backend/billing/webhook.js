const stripe = require('stripe')(process.env.STRIPE_SECRET);
app.post('/stripe/webhook', express.json(), (req, res) => {
  const event = req.body;
  if (event.type === 'invoice.paid') {
    // Activate API key for next cycle
  }
  res.send();
});
