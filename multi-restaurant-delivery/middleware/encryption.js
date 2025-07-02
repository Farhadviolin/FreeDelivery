import axios from 'axios';

export async function encryptAndStore(payload) {
  const { data } = await axios.post('https://vault-proxy/encrypt', { plaintext: btoa(JSON.stringify(payload)) });
  // store data.ciphertext into PDV
}

export async function fetchAndDecrypt(recordId) {
  const rec = await db.query('SELECT encrypted_payload FROM personal_data WHERE id=$1', [recordId]);
  const { data } = await axios.post('https://vault-proxy/decrypt', { ciphertext: rec.rows[0].encrypted_payload });
  return JSON.parse(atob(data.plaintext));
}
