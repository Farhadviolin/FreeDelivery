import nacl from 'tweetnacl';
import { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } from 'tweetnacl-util';

export function generateKeyPair() {
  return nacl.box.keyPair();
}

export function encryptMessage(message, senderSecretKey, receiverPublicKey) {
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const encrypted = nacl.box(
    decodeUTF8(message),
    nonce,
    receiverPublicKey,
    senderSecretKey
  );
  return {
    nonce: encodeBase64(nonce),
    cipher: encodeBase64(encrypted),
  };
}

export function decryptMessage(cipher, nonce, senderPublicKey, receiverSecretKey) {
  const decrypted = nacl.box.open(
    decodeBase64(cipher),
    decodeBase64(nonce),
    senderPublicKey,
    receiverSecretKey
  );
  return encodeUTF8(decrypted);
}
