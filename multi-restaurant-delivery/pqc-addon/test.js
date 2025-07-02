const { kyberGenerateKeyPair } = require('./index');

describe('PQC Addon', () => {
  it('should generate a Kyber keypair', () => {
    const [pub, priv] = kyberGenerateKeyPair();
    expect(pub).toBeDefined();
    expect(priv).toBeDefined();
  });
});
