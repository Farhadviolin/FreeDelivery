import { useEffect, useState } from 'react';
import { Card } from '../../packages/ui/src/Card';
import { Button } from '../../packages/ui/src/Button';
import { fetchUsers, fetchRoles, fetchAuditLogs } from '../services/adminService';

export default function SelfServiceAdmin() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    fetchUsers().then(setUsers);
    fetchRoles().then(setRoles);
    fetchAuditLogs().then(setLogs);
  }, []);
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Self-Service Admin</h1>
      <Card>
        <h2>User Management</h2>
        <ul>
          {users.map(u => (
            <li key={u.id}>{u.username} ({u.role})</li>
          ))}
        </ul>
      </Card>
      <Card>
        <h2>Roles</h2>
        <ul>
          {roles.map(r => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </Card>
      <Card>
        <h2>Audit Logs</h2>
        <ul>
          {logs.map(l => (
            <li key={l.id}>{l.action} by {l.user} at {l.timestamp}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
