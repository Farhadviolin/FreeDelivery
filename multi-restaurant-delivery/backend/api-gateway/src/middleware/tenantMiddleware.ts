import { Request, Response, NextFunction } from 'express';

// Extrahiert Tenant-ID aus Header, Subdomain oder JWT (hier: Header)
export function tenantMiddleware(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.headers['x-tenant-id'] as string;
  if (!tenantId) return res.status(400).json({ error: 'Missing tenant id' });
  // Im Request-Objekt speichern
  (req as any).tenantId = tenantId;
  next();
}
