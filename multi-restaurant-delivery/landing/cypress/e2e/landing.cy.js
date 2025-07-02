describe('Landing Page QR Flow', () => {
  it('shows correct campaign and fires analytics event', () => {
    cy.visit('/?utm_campaign=testcamp&utm_id=1234');
    cy.contains('Willkommen zur testcamp Aktion!');
    cy.window().then(win => {
      expect(win.dataLayer.some(e => e.event === 'qr_landing' && e.campaign === 'testcamp' && e.id === '1234')).to.be.true;
    });
  });
});
