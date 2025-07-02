import { Server as SocketIOServer } from 'socket.io';
import sendgrid from '@sendgrid/mail';
import admin from 'firebase-admin';
import Twilio from 'twilio';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);
admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FCM_CRED!)) });
const twilio = Twilio(process.env.TWILIO_SID!, process.env.TWILIO_TOKEN!);

export const notificationHandler = (io: SocketIOServer) => async (payload: any, event: string) => {
  // E-Mail an Kund:innen
  if (event === 'order.created') {
    await sendgrid.send({
      to: payload.email,
      from: 'no-reply@delivery.com',
      subject: 'Ihre Bestellung wurde aufgegeben',
      text: `Hallo ${payload.customerName},\nIhre Bestellung ${payload.orderId} ist eingegangen.`,
    });
  }
  // Push an Fahrer:innen
  if (event === 'dispatch.assigned') {
    await admin.messaging().send({
      token: payload.driverFcmToken,
      notification: {
        title: 'Neue Auslieferung',
        body: `Bestellung ${payload.orderId} zugewiesen`,
      },
    });
  }
  // SMS-Alert optional
  if (event === 'order.paid') {
    await twilio.messages.create({
      to: payload.phone,
      from: process.env.TWILIO_FROM!,
      body: `Ihre Zahlung für Bestellung ${payload.orderId} wurde erfolgreich verarbeitet.`,
    });
  }
  // WebSocket-Broadcast an Web-Clients
  io.emit(event, payload);
};
