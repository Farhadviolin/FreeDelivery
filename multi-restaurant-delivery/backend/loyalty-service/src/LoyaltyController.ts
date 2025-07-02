import { Request, Response, Router } from 'express';
import { LoyaltyService } from './LoyaltyService';
import { PointsTransactionType } from './entities/PointsTransaction';

export function LoyaltyController(service: LoyaltyService) {
  const router = Router();

  router.post('/earn', async (req: Request, res: Response) => {
    const { userId, points, type, orderId, description } = req.body;
    if (!userId || typeof points !== 'number' || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const tx = await service.addPoints(userId, points, type, orderId, description);
    res.json(tx);
  });

  router.get('/balance/:userId', async (req: Request, res: Response) => {
    const balance = await service.getBalance(req.params.userId);
    res.json({ userId: req.params.userId, balance });
  });

  router.get('/leaderboard', async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;
    const leaderboard = await service.getLeaderboard(limit);
    res.json(leaderboard);
  });

  return router;
}
