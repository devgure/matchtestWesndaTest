// cypress/e2e/auth.cy.ts
describe('Auth Flow', () => {
  it('should login with Google', () => {
    cy.visit('/auth');
    cy.get('[data-cy="google-login"]').click();
    cy.url().should('include', '/discover');
  });
});