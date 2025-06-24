describe('Phone Catalogue App', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/phones');
  });

  it('should display the phone catalogue page', () => {
    // Check if the search input is present
    cy.get('input[placeholder*="Search"]').should('be.visible');

    // Check if the phone catalog section is present
    cy.get('section[aria-label="Phone catalog"]').should('be.visible');
  });

  it('should display phone cards', () => {
    // Check if phone cards are displayed
    cy.get('[data-testid="phone-card"]').should('have.length.at.least', 1);

    // Check if each card has an image, name and price
    cy.get('[data-testid="phone-card"]')
      .first()
      .within(() => {
        cy.get('img').should('be.visible');
        cy.get('[data-testid="phone-name"]').should('be.visible');
        cy.get('[data-testid="phone-price"]').should('be.visible');
      });
  });

  it('should navigate to phone detail page when clicking on a phone', () => {
    // Click on the first phone card
    cy.get('[data-testid="phone-card"]').first().click();

    // Check if we're on the detail page
    cy.url().should('include', '/phones/');

    // Check if the detail page has the expected elements
    cy.get('[data-testid="phone-detail"]').should('be.visible');
    cy.get('[data-testid="color-options"]').should('be.visible');
    cy.get('[data-testid="storage-options"]').should('be.visible');
  });

  it('should filter phones when using the search input', () => {
    // Get the first phone name to use for search
    let firstPhoneName = '';
    cy.get('[data-testid="phone-name"]')
      .first()
      .then(($el) => {
        firstPhoneName = $el.text();

        // Type the phone name in the search input
        cy.get('input[placeholder*="Search"]').type(firstPhoneName);

        // Wait for the search results to update
        cy.wait(500);

        // Verify that the search results contain the phone
        cy.get('[data-testid="phone-name"]').should('contain', firstPhoneName);

        // Clear the search input
        cy.get('input[placeholder*="Search"]').clear();
      });
  });
});

describe('Shopping Cart', () => {
  beforeEach(() => {
    // Visit a phone detail page
    cy.visit('/phones');
    cy.get('[data-testid="phone-card"]').first().click();
  });

  it('should add a phone to the cart', () => {
    // Select color and storage options if available
    cy.get('[data-testid="color-option"]').first().click();
    cy.get('[data-testid="storage-option"]').first().click();

    // Add to cart
    cy.get('[data-testid="add-to-cart-button"]').click();

    // Check if the cart indicator shows 1 item
    cy.get('[data-testid="cart-count"]').should('contain', '1');
  });

  it('should navigate to cart page and display added items', () => {
    // Add item to cart first
    cy.get('[data-testid="color-option"]').first().click();
    cy.get('[data-testid="storage-option"]').first().click();
    cy.get('[data-testid="add-to-cart-button"]').click();

    // Go to cart page
    cy.get('[data-testid="cart-icon"]').click();

    // Check if we're on the cart page
    cy.url().should('include', '/cart');

    // Check if the cart has the item
    cy.get('[data-testid="cart-item"]').should('have.length', 1);

    // Check if the total price is displayed
    cy.get('[data-testid="total-price"]').should('be.visible');
  });

  it('should remove an item from the cart', () => {
    // Add item to cart first
    cy.get('[data-testid="color-option"]').first().click();
    cy.get('[data-testid="storage-option"]').first().click();
    cy.get('[data-testid="add-to-cart-button"]').click();

    // Go to cart page
    cy.get('[data-testid="cart-icon"]').click();

    // Remove the item
    cy.get('[data-testid="remove-button"]').first().click();

    // Check if the cart is empty
    cy.contains('Your cart is empty').should('be.visible');
    // Verify no cart items are present
    cy.get('[data-testid="cart-item"]').should('not.exist');
  });
});
