import Flagsmith from 'flagsmith-node';

const flags = Flagsmith.init({ apiKey: process.env.FLAGSMITH_API_KEY });
export async function isNewCheckout(userId: string) {
  const traits = [{ trait: 'userId', value: userId }];
  return flags.hasFeature('new_checkout_flow', traits);
}
