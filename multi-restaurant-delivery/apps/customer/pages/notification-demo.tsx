import React, { useState, useEffect } from 'react';
import Protected from '../components/Protected';

export default function NotificationDemo() {
  const [message, setMessage] = useState('');

  const handleNotify = () => {
    if (window.Notification && Notification.permission === 'granted') {
      new Notification('Neue Bestellung!', { body: 'Du hast eine neue Bestellung erhalten.' });
      setMessage('Notification gesendet!');
    } else if (window.Notification && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Neue Bestellung!', { body: 'Du hast eine neue Bestellung erhalten.' });
          setMessage('Notification gesendet!');
        }
      });
    } else {
      setMessage('Browser unterstützt keine Notifications oder abgelehnt.');
    }
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/status');
    ws.onmessage = (event) => {
      if (window.Notification && Notification.permission === 'granted') {
        new Notification('Live-Update', { body: event.data });
      }
    };
    return () => ws.close();
  }, []);

  return (
    <Protected>
      <div>
        <h2>Notification-Demo</h2>
        <button onClick={handleNotify}>Test-Benachrichtigung senden</button>
        {message && <div style={{color:'green'}}>{message}</div>}
      </div>
    </Protected>
  );
}
