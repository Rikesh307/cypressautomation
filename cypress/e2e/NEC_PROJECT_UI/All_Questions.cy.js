// cypress/e2e/all_questions.cy.js
describe('All Questions Page', () => {
    beforeEach(() => {
      // Load HTML content from fixture
      cy.fixture('all_questions.html').then((html) => {
        cy.document().invoke('write', html);
      });
    });
  
    // **1. Verify Page Title**
    it('should have a title "All Questions"', () => {
      cy.title().should('eq', 'All Questions');
    });
  
    // **2. Check Container Styling and Content**
    it('should have a styled container with correct content', () => {
      cy.get('.container')
        .should('have.css', 'max-width', '1200px')
        .and('contain.text', 'All Questions');
    });
  
    // **3. Verify Display of Question Cards**
    it('should display question cards correctly', () => {
      cy.get('.question-card').should('have.length.greaterThan', 0);
    });
  
    // **4. Check Question Number and Text**
    it('should display question number and text correctly', () => {
      cy.get('.question-card').first().within(() => {
        cy.get('.question-number').should('contain.text', 'Question 1');
        cy.get('.question-text').should('not.be.empty');
      });
    });
  
    // **5. Verify Display of Question Images**
    it('should display question images if they exist', () => {
      cy.get('.question-card').each(($card) => {
        cy.wrap($card).find('img').should('have.length.at.most', 1);
      });
    });
  
    // **6. Check Display of Options**
    it('should display options for each question', () => {
      cy.get('.question-card').each(($card) => {
        cy.wrap($card).find('.form-check').should('have.length.greaterThan', 0);
      });
    });
  
    // **7. Verify Option Inputs**
    it('should render option inputs with correct values', () => {
      cy.get('.form-check-input').each(($input) => {
        cy.wrap($input)
          .should('have.attr', 'type', 'radio')
          .and('have.attr', 'value').and('not.be.empty');
      });
    });
  
    // **8. Check Answer and Explanation Sections**
    it('should display answer and explanation sections correctly', () => {
      cy.get('.answer').should('exist');
      cy.get('.explanation').should('exist');
    });
  
    // **9. Verify Images in Options and Explanations**
    it('should display images in options and explanations if they exist', () => {
      cy.get('.form-check-label img').should('have.length.at.most', 1);
      cy.get('.explanation img').should('have.length.at.most', 1);
    });
  
    // **10. Test Hover Effects on Question Cards**
    it('should apply hover effect to question cards', () => {
      cy.get('.question-card').trigger('mouseover')
        .should('have.css', 'transform', 'translateY(-10px)');
    });
  });
  