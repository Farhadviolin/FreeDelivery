import { getConsent } from './consent-client';
export async function consentMiddleware(req, res, next) {
  const hasConsent = await getConsent(req.user.id, req.path);
  if (!hasConsent) return res.status(403).send('Consent required');
  next();
}
