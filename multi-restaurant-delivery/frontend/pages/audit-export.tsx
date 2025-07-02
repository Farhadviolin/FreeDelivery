import { useEffect, useState } from 'react';
import { Card } from '../../packages/ui/src/Card';
import { Button } from '../../packages/ui/src/Button';
import { fetchAuditExport } from '../services/auditService';

export default function AuditExportPage() {
  const [csv, setCsv] = useState('');
  const [json, setJson] = useState('');
  useEffect(() => {
    fetchAuditExport('csv').then(setCsv);
    fetchAuditExport('json').then(setJson);
  }, []);
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Audit & Compliance Export</h1>
      <Card>
        <h2>CSV Export</h2>
        <Button onClick={() => download(csv, 'audit.csv')}>Download CSV</Button>
        <pre className="overflow-x-auto text-xs">{csv}</pre>
      </Card>
      <Card>
        <h2>JSON Export</h2>
        <Button onClick={() => download(json, 'audit.json')}>Download JSON</Button>
        <pre className="overflow-x-auto text-xs">{json}</pre>
      </Card>
    </div>
  );
}

function download(data: string, filename: string) {
  const blob = new Blob([data], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
