import { useEffect, useState } from 'react';
import { Card } from '../../packages/ui/src/Card';
import { Button } from '../../packages/ui/src/Button';
import { fetchTenants, switchTenant } from '../services/tenantService';

export default function TenantAdmin() {
  const [tenants, setTenants] = useState([]);
  useEffect(() => {
    fetchTenants().then(setTenants);
  }, []);
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Tenant Management</h1>
      <Card>
        <h2>Tenants</h2>
        <ul>
          {tenants.map(t => (
            <li key={t.id}>
              {t.name} <Button onClick={() => switchTenant(t.id)}>Switch</Button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
