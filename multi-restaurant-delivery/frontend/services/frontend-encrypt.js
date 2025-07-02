async function encryptData(plainText) {
  const key = await window.crypto.subtle.importKey(
    'raw', hexToArrayBuffer(USER_KEY), { name: 'AES-GCM' }, false, ['encrypt']
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plainText));
  return { iv: bufferToHex(iv), data: bufferToHex(cipher) };
}
