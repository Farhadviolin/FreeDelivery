import { handleNotification } from '../src/handlers/notificationHandler';

jest.mock('../src/handlers/emailSender', () => ({ sendEmail: jest.fn() }));
jest.mock('../src/handlers/pushSender', () => ({ sendPush: jest.fn() }));
jest.mock('../src/handlers/smsSender', () => ({ sendSMS: jest.fn() }));
jest.mock('../src/handlers/socketSender', () => ({ sendSocket: jest.fn() }));

const { sendEmail } = require('../src/handlers/emailSender');
const { sendPush } = require('../src/handlers/pushSender');
const { sendSMS } = require('../src/handlers/smsSender');
const { sendSocket } = require('../src/handlers/socketSender');

describe('handleNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call sendEmail for email type', async () => {
    await handleNotification({
      type: 'email',
      to: 'test@example.com',
      subject: 'Test',
      text: 'Hello',
    });
    expect(sendEmail).toHaveBeenCalled();
  });

  it('should call sendPush for push type', async () => {
    await handleNotification({ type: 'push', to: 'user1', title: 'Hi', body: 'World' });
    expect(sendPush).toHaveBeenCalled();
  });

  it('should call sendSMS for sms type', async () => {
    await handleNotification({ type: 'sms', to: '+4912345678', message: 'Hi' });
    expect(sendSMS).toHaveBeenCalled();
  });

  it('should call sendSocket for socket type', async () => {
    await handleNotification({ type: 'socket', to: 'user1', event: 'order', payload: { id: 1 } });
    expect(sendSocket).toHaveBeenCalled();
  });

  it('should throw for unknown type', async () => {
    await expect(handleNotification({ type: 'unknown', to: 'x' })).rejects.toThrow();
  });
});
