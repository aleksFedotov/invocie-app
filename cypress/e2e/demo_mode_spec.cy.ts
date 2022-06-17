describe('demo mode', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.findByRole('button', {
      name: /demo/i,
    }).click();
  });
  it('should open home page with initial 7 invoices', () => {
    cy.get('[data-testid="invoice"]').should('have.length', 7);
  });
  it('fitlers testing', () => {
    cy.findByText(/filter by status/i).click();
    cy.get('[data-testid="filters"] > :nth-child(1) > p').click();
    cy.get('[data-testid="invoice"]').should('have.length', 1);
    cy.get('[data-testid="filters"] > :nth-child(1) > p').click();
    cy.get('[data-testid="filters"] > :nth-child(2) > p').click();
    cy.get('[data-testid="invoice"]').should('have.length', 4);
    cy.get('[data-testid="filters"] > :nth-child(2) > p').click();
    cy.get('[data-testid="filters"] > :nth-child(3) > p').click();
    cy.get('[data-testid="invoice"]').should('have.length', 2);
    cy.get('[data-testid="filters"] > :nth-child(3) > p').click();
    cy.findByText(/filter by status/i).click();
  });

  it('should open invoice-view and comeback to main page', () => {
    //should open invoice view
    cy.findByText(/alex grim/i).click();
    cy.url().should('include', '/invoice/XM9141');

    // should come back to main page
    cy.get('.back_btn').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should change status from pending to paid', () => {
    cy.findByText(/alex grim/i).click();
    cy.findByText(/pending/i);
    cy.findByRole('button', {
      name: /mark as paid/i,
    }).click();
    cy.findByText('paid');
  });

  it('should open delete pop and close it', () => {
    cy.findByText(/alex grim/i).click();
    cy.findByRole('button', {
      name: /delete/i,
    }).click();
    cy.findByRole('button', {
      name: /cancel/i,
    }).click();
  });

  it('should delete incoice', () => {
    cy.findByText(/alex grim/i).click();
    cy.findByRole('button', {
      name: /delete/i,
    }).click();
    cy.get('[data-testid="delete-popup"]').click();
    cy.get('[data-testid="invoice"]').should('have.length', 6);
    cy.findByText(/alex grim/i).should('not.exist');
  });

  it('should opne and close edit form', () => {
    cy.findByText(/alex grim/i).click();
    cy.findByRole('button', {
      name: /edit/i,
    }).click();
    cy.get('#modal > form');
    cy.findByRole('button', {
      name: /cancel/i,
    }).click();
    cy.get('#modal > form').should('not.exist');
  });

  it('should edit invoice', () => {
    cy.findByText(/alex grim/i).click();
    cy.findByRole('button', {
      name: /edit/i,
    }).click();

    cy.findByRole('textbox', {
      name: /clientemail/i,
    })
      .clear()
      .type('test@test.com');
    cy.findByRole('button', {
      name: /save changes/i,
    }).click();
    cy.findByText('test@test.com');
  });

  it('should not let save changes if validation fails', () => {
    cy.findByText(/alex grim/i).click();
    cy.findByRole('button', {
      name: /edit/i,
    }).click();
    cy.findByRole('textbox', {
      name: /clientemail/i,
    })
      .clear()
      .type('test.com');
    cy.findByRole('button', {
      name: /save changes/i,
    }).click();
    cy.findByText('Invalid email');
  });
});

export {};
