describe('App Launch', () => {
  beforeAll(async () => { await device.launchApp(); });
  it('should show login screen', async () => {
    await expect(element(by.id('loginButton'))).toBeVisible();
  });
});
