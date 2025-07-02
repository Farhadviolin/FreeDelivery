import 'reflect-metadata';
import express from 'express';
import { useContainer, useExpressServer } from 'routing-controllers';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NotificationController } from './controllers/NotificationController';
import { initRabbit, RabbitSubscriber } from './rabbit';
import { notificationHandler } from './handlers/notificationHandler';

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, { cors: { origin: '*' } });

// WebSocket: alle Clients
io.on('connection', (socket) => {
  console.log('WebSocket Client verbunden:', socket.id);
});

// RabbitMQ abonnieren
initRabbit().then((channel) => {
  RabbitSubscriber(
    channel,
    'orders_exchange',
    ['order.created', 'order.paid', 'dispatch.assigned'],
    notificationHandler(io),
  );
});

// HTTP-API z.B. Health-Check
useContainer(app);
useExpressServer(app, { controllers: [NotificationController] });

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Notification-Service läuft auf Port ${PORT}`));
