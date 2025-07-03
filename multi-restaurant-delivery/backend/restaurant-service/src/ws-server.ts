import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const server = createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
  ws.send('Willkommen beim Restaurant-Service WebSocket!');
  ws.on('message', (message: string) => {
    ws.send(`Echo: ${message}`);
  });
});

const PORT = process.env.WS_PORT ? Number(process.env.WS_PORT) : 4002;
server.listen(PORT, () => {
  console.log(`WebSocket-Server läuft auf ws://localhost:${PORT}`);
});
