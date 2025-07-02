// src/crypto/clientEncrypt.js
export async function encryptPayload(publicKeyPem, payload) {
  const enc = new TextEncoder();
  const data = enc.encode(JSON.stringify(payload));
  const pemToArrayBuffer = (pem) => {
    const b64 = pem.replace(/-----.*-----/g, '').replace(/\s+/g, '');
    const bin = atob(b64);
    const buf = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
    return buf.buffer;
  };
  const arrayBufferToBase64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
  const key = await crypto.subtle.importKey(
    'spki', pemToArrayBuffer(publicKeyPem), { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['encrypt']
  );
  const encrypted = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, key, data);
  return arrayBufferToBase64(encrypted);
}
