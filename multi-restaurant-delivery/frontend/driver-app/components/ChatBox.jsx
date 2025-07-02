import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export default function ChatBox({ userId, toId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(process.env.EXPO_PUBLIC_SOCKET_URL + "/chat");
    socketRef.current.on("msg", msg => setMessages(msgs => [...msgs, { from: toId, text: msg }]));
    return () => socketRef.current.disconnect();
  }, [toId]);

  const send = () => {
    socketRef.current.emit("message", { to: toId, msg: input });
    setMessages(msgs => [...msgs, { from: userId, text: input }]);
    setInput("");
  };

  return (
    <div>
      <div style={{ height: 200, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.from === userId ? "right" : "left" }}>{m.text}</div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={send}>Senden</button>
    </div>
  );
}
