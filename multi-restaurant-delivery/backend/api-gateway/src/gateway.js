import sodium from 'libsodium-wrappers';
import express from 'express';
import { getVaultKey } from './vaultClient';

await sodium.ready;
const app = express();
app.use(express.json());

app.post('/secure', async (req, res) => {
  const { ciphertext, nonce, keyId } = req.body;
  const key = await getVaultKey(keyId); // raw key bytes
  const plaintext = sodium.crypto_secretbox_open_easy(
    sodium.from_base64(ciphertext),
    sodium.from_base64(nonce),
    key,
  );
  // process plaintext, then respond encrypted
  const response = { msg: 'ACK' };
  const respNonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const respCipher = sodium.crypto_secretbox_easy(
    Buffer.from(JSON.stringify(response)),
    respNonce,
    key,
  );
  res.json({
    ciphertext: sodium.to_base64(respCipher),
    nonce: sodium.to_base64(respNonce),
  });
});

app.listen(8443);
