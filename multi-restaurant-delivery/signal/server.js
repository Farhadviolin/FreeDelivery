const io = require('socket.io')(3000, { cors: { origin: '*' } });
const mediasoup = require('mediasoup');
const { verifyToken } = require('./auth');
// Setup SFU, rooms, transports omitted for brevity
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token || !verifyToken(token)) {
    return next(new Error('Authentication error'));
  }
  next();
});
io.on('connection', socket => {
  socket.on('join-room', ({ roomId }) => { /* create/join mediasoup room */ });
  socket.on('signal', data => { /* forward to SFU */ });
});
