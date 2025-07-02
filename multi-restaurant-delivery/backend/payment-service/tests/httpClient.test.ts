import client from '../src/utils/httpClient';
import axios from 'axios';

describe('httpClient retry', () => {
  it('retries on network error', async () => {
    jest.spyOn(axios.Axios.prototype, 'request').mockRejectedValueOnce(new Error('Network Error'));
    jest.spyOn(axios.Axios.prototype, 'request').mockResolvedValueOnce({ data: 'ok' });
    const res = await client.get('https://test.com');
    expect(res.data).toBe('ok');
  });
});
