describe('Driver Login', () => {
  it('should log in successfully', () => {
    cy.visit('/driver-login');
    cy.get('input[name=email]').type('driver@example.com');
    cy.get('input[name=password]').type('password123');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/driver-dashboard');
  });
});
