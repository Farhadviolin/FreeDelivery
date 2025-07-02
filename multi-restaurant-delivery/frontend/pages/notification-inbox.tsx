import { useEffect, useState } from 'react';
import { Card } from '../../packages/ui/src/Card';
import { Button } from '../../packages/ui/src/Button';
import { fetchNotifications, markAsRead, fetchSettings } from '../services/notificationService';

export default function NotificationInbox() {
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({});
  useEffect(() => {
    fetchNotifications().then(setNotifications);
    fetchSettings().then(setSettings);
  }, []);
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Notification Inbox</h1>
      <Card>
        <h2>Inbox</h2>
        <ul>
          {notifications.map(n => (
            <li key={n.id} className={n.read ? '' : 'font-bold'}>
              {n.message} <Button onClick={() => markAsRead(n.id)}>Mark as read</Button>
            </li>
          ))}
        </ul>
      </Card>
      <Card>
        <h2>Settings</h2>
        <pre>{JSON.stringify(settings, null, 2)}</pre>
      </Card>
    </div>
  );
}
