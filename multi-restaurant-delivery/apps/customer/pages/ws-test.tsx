import React, { useEffect, useState } from 'react';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:4002';

export default function WsTest() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    setWs(socket);
    socket.onmessage = (event) => {
      setMessages((msgs) => [...msgs, event.data]);
    };
    socket.onopen = () => setMessages((msgs) => [...msgs, 'Verbunden!']);
    socket.onerror = () => setMessages((msgs) => [...msgs, 'Fehler beim Verbinden!']);
    return () => socket.close();
  }, []);

  const send = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(input);
      setInput('');
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>WebSocket Test</h1>
      <p>Verbinde zu <code>{WS_URL}</code></p>
      <div style={{ marginBottom: 16 }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Nachricht senden..." />
        <button onClick={send} disabled={!ws || ws.readyState !== WebSocket.OPEN}>Senden</button>
      </div>
      <div style={{ background: '#f4f4f4', padding: 16, borderRadius: 8, minHeight: 100 }}>
        {messages.map((msg, i) => <div key={msg + i}>{msg}</div>)}
      </div>
    </div>
  );
}
