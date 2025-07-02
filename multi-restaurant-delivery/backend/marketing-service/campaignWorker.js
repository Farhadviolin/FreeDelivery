const { ZBClient } = require('zeebe-node');
const nodemailer = require('nodemailer');
const zbc = new ZBClient();
const transporter = nodemailer.createTransport({
  /* SMTP config */
});

zbc.createWorker('send-email', async (job) => {
  await transporter.sendMail({
    /* ... */
  });
  return job.complete();
});
