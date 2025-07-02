const twilio = require('twilio')(SID, TOKEN);
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/whatsapp', (req, res) => {
  const incoming = req.body.Body;
  // send to NLU endpoint
  // send response back
  res.send(`<Response><Message>Danke für Ihre Nachricht!</Message></Response>`);
});
app.listen(3001);
