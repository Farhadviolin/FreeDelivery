import axios from 'axios';
import axiosRetry from 'axios-retry';

const client = axios.create({ timeout: 5000 });
axiosRetry(client, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export default client;
