/// <reference types="cypress" />

describe('Login Page', () => {

  beforeEach(() => {
    // Ensure the fixture file is correctly loaded
    cy.fixture('login.html').then((loginPageHtml) => {
      // Load the HTML fixture into the document
      cy.document().then((doc) => {
        doc.open();
        doc.write(loginPageHtml);
        doc.close();
      });
    });
  });

  it('should have the correct page title', () => {
    cy.title().should('eq', 'Login');
  });

  it('should display the login form with username and password fields', () => {
    cy.get('form').should('exist');
    cy.get('#username').should('exist').and('have.attr', 'name', 'username');
    cy.get('#password').should('exist').and('have.attr', 'name', 'password');
    cy.get('button[type="submit"]').should('exist').and('have.text', 'Login');
  });

  it('should have a CSRF token input field', () => {
    cy.get('input[name="_csrf"]').should('exist');
  });

  it('should show an error message for incorrect login', () => {
    // Simulate entering incorrect credentials and submitting the form
    cy.get('#username').type('wronguser');
    cy.get('#password').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    // Verify error message
    cy.get('.footer-section p').should('contain.text', 'Incorrect username or password.');
  });

  it('should have a functional forgot password link', () => {
    cy.get('.reset-password-link').should('have.attr', 'href', '/request-password-reset');
  });

  it('should have a functional sign up link', () => {
    cy.get('.sign-up-link').should('have.attr', 'href', '/signup');
  });

  it('should handle form submission', () => {
    // Simulate entering valid credentials
    cy.get('#username').type('testuser');
    cy.get('#password').type('testpassword');
    cy.get('button[type="submit"]').click();
    
    // Check for URL change or verify form submission
    // This part is speculative as actual submission behavior is not implemented in static HTML
    // Adjust based on how your application behaves
    cy.url().should('not.include', '/login'); // Modify based on actual behavior
  });

  it('should display the page correctly on mobile view', () => {
    cy.viewport('iphone-6');
    cy.get('.login-container').should('be.visible');
    cy.get('form').should('be.visible');
  });

});
