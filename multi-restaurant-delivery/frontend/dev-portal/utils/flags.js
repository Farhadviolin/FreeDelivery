import Flagsmith from 'flagsmith';
const flagsmith = Flagsmith.init({
  environmentID: process.env.FLAGSMITH_ENV_ID,
  enableAnalytics: true,
});
export async function getFlags() {
  await flagsmith.hasFeature('new_checkout_flow');
  return {
    newCheckout: flagsmith.getValue('new_checkout_flow') === 'variant'
  };
}
