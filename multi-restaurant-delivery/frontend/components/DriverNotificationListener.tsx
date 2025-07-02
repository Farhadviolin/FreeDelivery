import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DriverNotificationListener() {
  useEffect(() => {
    let ws: WebSocket | null = null;
    if (typeof window !== 'undefined') {
      ws = new WebSocket('ws://localhost:8000/ws/driver/notifications');
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        toast.info(data.message);
      };
    }
    return () => ws && ws.close();
  }, []);
  return <ToastContainer position="top-right" autoClose={5000} />;
}
