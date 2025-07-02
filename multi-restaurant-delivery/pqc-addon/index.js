// uses a prebuilt pqcrypto.node binding
const pqcrypto = require('./build/Release/pqcrypto');
module.exports = {
  kyberGenerateKeyPair: pqcrypto.kyber_generate_keypair,
  kyberEncapsulate: pqcrypto.kyber_encapsulate,
  kyberDecapsulate: pqcrypto.kyber_decapsulate,
};
