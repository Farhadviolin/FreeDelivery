import React from 'react';
import { WebXRScene } from './WebXRScene';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <h1>Virtuelles Restaurant-Erlebnis</h1>
      <WebXRScene />
    </div>
  );
}
