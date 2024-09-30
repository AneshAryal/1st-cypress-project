Cypress.on('uncaught:exception', (err, runnable) => {
    // Returning false prevents Cypress from failing the test
    if (err.message.includes('ResizeObserver loop')) {
      return false;
    }
  });
  describe('Gmail Login', () => {
    beforeEach(() => {
      // Visit the Gmail login page directly to avoid redirects
      cy.visit('https://accounts.google.com/ServiceLogin')
    })
  
    it('displays the login page', () => {
      // Check that the email input and Next button are visible
      cy.get('input[type="email"]').should('be.visible')
      cy.get('button').contains('Next').should('be.visible')
    
    })
  
    it('logs in with valid credentials', () => {
      const email = 'anish.aryal@sageflick.com' 
      const password = 'Khalti@321' 

      // Enter email and click Next
      cy.get('input[type="email"]').type(email)
      cy.get('button').contains('Next').click()
  
      // Wait for the password input to be visible
      cy.get('input[type="password"]').should('be.visible').type(password)
      cy.get('button').contains('Next').click()
  
      // Assert that the inbox is displayed
      cy.url().should('include', 'mail')
      cy.get('h1').should('contain', 'Inbox')
      cy.get('button').contains('get the verification code ').should('be.visible')

        cy.contains('Get a verification code', { timeout: 10000 }).should('be.visible').click();
        
      
    })
  
    it('shows error on invalid credentials', () => {
      cy.get('input[type="email"]').type('anish.aryal@sageflick.com')
      cy.get('button').contains('Next').click()
  
      // Check for an error message indicating account not found
      cy.get('div').should('contain', 'Couldn’t find your Google Account')
    })
  
    context('after successful login', () => {
      beforeEach(() => {
        const email = 'anish.aryal@sageflick.com' 
        const password = 'Khalti@321' 
  
        // Log in before each test in this context
        
        cy.get('input[type="email"]').type(email)
        cy.get('button').contains('Next').click()
        cy.get('input[type="password"]').type(password)
        cy.get('button').contains('Next').click()
      })
  
      it('can send verification code to a phone', () => {
        // Click on the "Get a verification code" button
        cy.contains('Get a verification code', { timeout: 10000 }).should('be.visible').click();
      
        // Wait for the phone number input to be visible and type the phone number
        // Try multiple strategies for the input selector
        cy.get('input[type="tel"]', { timeout: 10000 }).should('be.visible').type('9845977631')
          .should('have.value', '9845977631');  // Assert that the value was typed correctly
      
        // Submit the form (replace "Next" with actual button text if different)
        cy.get('button').contains('Send').click();
      
        // Assert the expected URL or outcome
        cy.url().should('include', 'verification-code-page');  // Adjust URL as needed
        cy.contains('Welcome');  // Example assertion for successful login
        cy.get('input[type="email"]').should('be.visible').type('anish.aryal@sageflick.com');
       // Get the button element with the text "Send"
       cy.get('button').contains('Send').should('be.visible').click();

// Get the input element with the type "number"
cy.get('input[type="number"]').type('9845977631').should('have.value', '9845977631');

// Press Enter on the input element
cy.get('input[type="number"]').type('{enter}');

      });
    
      })

  })