import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_CHAT_URL!);
export function ChatWidget() {
  const [msgs, setMsgs] = useState<{user:string,text:string}[]>([]);
  const [input, setInput] = useState('');
  useEffect(() => {
    socket.on('bot_msg', (data) => setMsgs((m) => [...m, {user:'bot', text:data}]));
  }, []);
  const send = () => {
    socket.emit('user_msg', input);
    setMsgs((m) => [...m, {user:'user', text:input}]);
    setInput('');
  };
  return (
    <div className="chat-widget">
      <div className="messages">
        {msgs.map((m,i)=><div key={i} className={m.user}>{m.text}</div>)}
      </div>
      <input value={input} onChange={e=>setInput(e.target.value)} />
      <button onClick={send}>Senden</button>
    </div>
  );
}
