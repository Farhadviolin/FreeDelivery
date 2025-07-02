import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  const submit = async () => {
    const res = await axios.post('/dsar', { subject_id: id, request_type: 'access' });
    setStatus(res.data.status);
  };
  return (
    <div>
      <input value={id} onChange={e=>setId(e.target.value)} placeholder="Your ID"/>
      <button onClick={submit}>Submit DSAR</button>
      <p>Status: {status}</p>
    </div>
  );
}
