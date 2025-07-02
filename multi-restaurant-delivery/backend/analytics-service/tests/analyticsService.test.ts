import { AnalyticsService } from '../src/services/AnalyticsService';
import Redis from 'ioredis';

jest.mock('ioredis');
const mockDS = { query: jest.fn() };
const mockRedis = { get: jest.fn(), set: jest.fn() };
(Redis as any).mockImplementation(() => mockRedis);

const svc = new AnalyticsService();
svc['ds'] = mockDS;

const revenueRows = [{ day: '2025-06-01', revenue: '1000' }];

describe('AnalyticsService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('getRevenueStats liefert Cache-Treffer', async () => {
    mockRedis.get.mockResolvedValue(JSON.stringify(revenueRows));
    const res = await svc.getRevenueStats(new Date('2025-06-01'), new Date('2025-06-30'));
    expect(res).toEqual(revenueRows);
  });

  it('getRevenueStats berechnet und cached bei Miss', async () => {
    mockRedis.get.mockResolvedValue(null);
    mockDS.query.mockResolvedValue(revenueRows);
    const res = await svc.getRevenueStats(new Date('2025-06-01'), new Date('2025-06-30'));
    expect(res).toEqual(revenueRows);
    expect(mockRedis.set).toHaveBeenCalled();
  });

  it('getOrdersPerDay liefert Ergebnis', async () => {
    const rows = [{ day: '2025-06-01', count: '10' }];
    mockDS.query.mockResolvedValue(rows);
    const res = await svc.getOrdersPerDay(7);
    expect(res).toEqual(rows);
  });

  it('getAvgDeliveryTime liefert Ergebnis', async () => {
    const rows = [{ day: '2025-06-01', avgSeconds: 1200 }];
    mockDS.query.mockResolvedValue(rows);
    const res = await svc.getAvgDeliveryTime(7);
    expect(res).toEqual(rows);
  });
});
