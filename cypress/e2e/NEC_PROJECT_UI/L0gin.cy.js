describe('Login Form Tests', () => {
    const loginUrl = 'http://13.233.251.95/login';
    const username = 'mataraja';
    const password = 'Timimeroraja10#';
    const dashboardUrl = 'http://13.233.251.95/dashboard/computer';

    beforeEach(() => {
        cy.visit(loginUrl);
    });

    // 1. Page Load and Basic Elements
    it('should have the correct page title', () => {
        cy.title().should('eq', 'Login');
    });

    it('should display login form elements', () => {
        cy.get('#username').should('exist').and('have.attr', 'name', 'username');
        cy.get('#password').should('exist').and('have.attr', 'name', 'password');
        cy.get('button[type="submit"]').should('exist').and('have.text', 'Login');
    });

    // 2. Successful Login
    it('should log in successfully with valid credentials and redirect to dashboard', () => {
        cy.get('#username').type(username);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', dashboardUrl);
    });

    it('should display a success message upon successful login', () => {
        cy.get('#username').type(username);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').click();
        cy.get('.success-message').should('be.visible').and('contain.text', 'Login successful');
    });

    it('should have a functional logout button after login', () => {
        cy.get('#username').type(username);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').click();
        cy.get('.header .logout-btn').should('be.visible')
                                     .and('have.attr', 'href', '/logout')
                                     .and('contain.text', 'Logout');
    });

    // 3. Unsuccessful Login
    it('should display an error message for incorrect credentials', () => {
        cy.get('#username').type('wronguser');
        cy.get('#password').type('wrongpassword');
        cy.get('button[type="submit"]').click();
        cy.get('.footer-section p').should('contain.text', 'Incorrect username or password.');
    });

    it('should not redirect to dashboard on incorrect credentials', () => {
        cy.get('#username').type('wronguser');
        cy.get('#password').type('wrongpassword');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/login');
    });

    it('should display validation errors for empty fields', () => {
        cy.get('button[type="submit"]').click();
        cy.get('#username:invalid').should('exist');
        cy.get('#password:invalid').should('exist');
    });

    it('should handle network errors gracefully', () => {
        cy.intercept('POST', '/api/users/login', { forceNetworkError: true }).as('loginRequest');
        cy.get('#username').type(username);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').click();
        cy.get('.error-message').should('contain.text', 'Network error');
    });
});
