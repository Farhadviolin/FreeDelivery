const { Worker } = require('bullmq');
const handlebars = require('handlebars');
const sendgrid = require('@sendgrid/mail');
const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const admin = require('firebase-admin');
const axios = require('axios');
const fs = require('fs');

sendgrid.setApiKey(process.env.SENDGRID_KEY);

const worker = new Worker('notifications', async job => {
  const { channel, to, template, data } = job.data;
  const tplSource = fs.readFileSync(`./notification/templates/${template}.hbs`, 'utf8');
  const tpl = handlebars.compile(tplSource);
  const content = tpl(data);

  switch(channel) {
    case 'email':
      await sendgrid.send({ to, from: 'no-reply@delivery.com', subject: data.subject, html: content });
      break;
    case 'sms':
      await twilio.messages.create({ to, from: process.env.TWILIO_NUMBER, body: content });
      break;
    case 'push':
      await admin.messaging().send({ token: to, notification: { title: data.title, body: data.body } });
      break;
    case 'slack':
      await axios.post(process.env.SLACK_WEBHOOK_URL, { text: content });
      break;
    default:
      throw new Error(`Unknown channel ${channel}`);
  }
}, { connection: { host:'redis', port:6379 }});
