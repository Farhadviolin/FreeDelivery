const io = require('socket.io')(3001);
const axios = require('axios');
io.on('connection', (socket) => {
  socket.on('user_msg', async (msg) => {
    const res = await axios.post(`${process.env.RASA_URL}/webhooks/rest/webhook`, { message: msg });
    const reply = res.data[0].text;
    socket.emit('bot_msg', reply);
  });
});
