import { values } from 'cypress/types/lodash';

const testData = {
  description: 'Re-branding',
  clientName: 'Jensen Huang',
  paymentTerms: 7,
  clientEmail: 'jensenh@mail.com',
  senderAddress: {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  },
  clientAddress: {
    street: '106 Kendell Street',
    city: 'Sharrington',
    postCode: 'NR24 5WQ',
    country: 'United Kingdom',
  },
  items: [
    {
      name: 'Brand Guidelines',
      quantity: 1,
      price: 1800,
    },
  ],
};

describe('user mode', () => {
  it('should login in a new account and create a new invoice', () => {
    cy.visit('http://localhost:3000/');
    cy.findByRole('button', {
      name: /sing up/i,
    }).click();

    // Login
    cy.findByText('Login').click();
    cy.findByRole('textbox', {
      name: /email/i,
    }).type('usertest@test.com');
    cy.findByLabelText('password').type('123456');
    cy.findByRole('button', { name: /Login to your account/i }).click();

    // check amount of invoices
    let oldInvoicesAmount: number;
    cy.get('[data-testid="total-text"]')
      .invoke('data', 'value')
      .then((size) => (oldInvoicesAmount = +size));

    // New invoice creation
    cy.findByRole('button', { name: /New invoice/i }).click();
    cy.findByRole('textbox', {
      name: /senderstreet/i,
    })
      .type(testData.senderAddress.street)
      .should('have.value', testData.senderAddress.street);
    cy.findByRole('textbox', {
      name: /sendercity/i,
    })
      .type(testData.senderAddress.city)
      .should('have.value', testData.senderAddress.city);
    cy.findByRole('textbox', {
      name: /senderpostcode/i,
    })
      .type(testData.senderAddress.postCode)
      .should('have.value', testData.senderAddress.postCode);
    cy.findByRole('textbox', {
      name: /sendercountry/i,
    })
      .type(testData.senderAddress.country)
      .should('have.value', testData.senderAddress.country);
    cy.findByRole('textbox', {
      name: /clientname/i,
    })
      .type(testData.clientName)
      .should('have.value', testData.clientName);
    cy.findByRole('textbox', {
      name: /clientemail/i,
    })
      .type(testData.clientEmail)
      .should('have.value', testData.clientEmail);
    cy.findByRole('textbox', {
      name: /clientstreet/i,
    })
      .type(testData.clientAddress.street)
      .should('have.value', testData.clientAddress.street);
    cy.findByRole('textbox', {
      name: /clientcity/i,
    })
      .type(testData.clientAddress.city)
      .should('have.value', testData.clientAddress.city);
    cy.findByRole('textbox', {
      name: /clientpostcode/i,
    })
      .type(testData.clientAddress.postCode)
      .should('have.value', testData.clientAddress.postCode);
    cy.findByRole('textbox', {
      name: /clientcountry/i,
    })
      .type(testData.clientAddress.country)
      .should('have.value', testData.clientAddress.country);

    // Date picker
    let currentDate;
    cy.findByRole('textbox', {
      name: /date/i,
    })
      .then(($date) => (currentDate = $date))
      .click();
    cy.findByText(/28/i).click();

    // Terms
    cy.get('[data-testid="selectDropDown"]').click();
    cy.get('[data-value="7"]').click();
    cy.get('[data-testid="selectDropDown"]');

    cy.findByRole('textbox', {
      name: /description/i,
    })
      .type(testData.description)
      .should('have.value', testData.description);

    // invoice itmes
    cy.findByRole('button', { name: /Add New Item/i }).click();
    cy.findByRole('textbox', {
      name: /itemname/i,
    })
      .type(testData.items[0].name)
      .should('have.value', testData.items[0].name);
    cy.findByRole('textbox', {
      name: /quantity/i,
    })

      .type(testData.items[0].quantity.toString())
      .should('have.value', testData.items[0].quantity.toString());
    cy.findByRole('textbox', {
      name: /price/i,
    })
      .type(testData.items[0].price.toString())
      .should('have.value', testData.items[0].price.toString());

    cy.findByRole('button', { name: /Save & Send/i }).click();

    // check amount of invoices
    cy.wait(500);
    cy.get('[data-testid="invoice"]').then((invoices) => {
      const newInvoicesAmount = invoices.length;
      // @ts-ignore
      expect(newInvoicesAmount - oldInvoicesAmount).eq(1);
    });
  });

  it('it should login and edit invoice', () => {
    cy.visit('http://localhost:3000/');
    cy.findByRole('button', {
      name: /sing up/i,
    }).click();

    // Login
    cy.findByText('Login').click();
    cy.findByRole('textbox', {
      name: /email/i,
    }).type('usertest@test.com');
    cy.findByLabelText('password').type('123456');
    cy.findByRole('button', { name: /Login to your account/i }).click();
    cy.get('[data-testid="invoice"]').eq(0).click();

    // open edit form
    cy.findByRole('button', {
      name: /edit/i,
    }).click();

    // changing email
    cy.findByRole('textbox', {
      name: /clientemail/i,
    })
      .clear()
      .type('test@test.com');
    cy.findByRole('button', {
      name: /save changes/i,
    }).click();
    cy.findByText('test@test.com');

    // check status
    cy.findByText('pending');

    // change status to paid
    cy.findByRole('button', {
      name: /mark as paid/i,
    }).click();
    cy.findByText('paid');
  });

  it('shoild login and delete invoice', () => {
    cy.visit('http://localhost:3000/');
    cy.findByRole('button', {
      name: /sing up/i,
    }).click();

    // Login
    cy.findByText('Login').click();
    cy.findByRole('textbox', {
      name: /email/i,
    }).type('usertest@test.com');
    cy.findByLabelText('password').type('123456');
    cy.findByRole('button', { name: /Login to your account/i }).click();

    // check amount of invoices
    let oldInvoicesAmount: number;
    cy.get('[data-testid="total-text"]')
      .invoke('data', 'value')
      .then((size) => (oldInvoicesAmount = +size));

    // select first invoice
    cy.get('[data-testid="invoice"]').eq(0).click();

    // open delete popup
    cy.findByRole('button', {
      name: /delete/i,
    }).click();

    // delete invoice
    cy.get('[data-testid="delete-popup"]').click();

    // check if total amount changed

    cy.wait(500);

    cy.get('[data-testid="total-text"]')
      .invoke('data', 'value')
      .then((value) => {
        const newInvoicesAmount = +value;
        // @ts-ignore
        expect(oldInvoicesAmount - 1).eq(newInvoicesAmount);
      });
  });
});

export {};
