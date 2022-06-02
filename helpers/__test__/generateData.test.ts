import generateData from '../generateData';

const testData = {
  createdAt: '2021-08-18',

  description: 'Re-branding',
  paymentTerms: 1,
  clientName: 'Jensen Huang',
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
      price: 1800.9,
      total: 1800.9,
    },
  ],
};

const result = {
  id: 'RT3080',
  createdAt: '2021-08-18',
  paymentDue: '2021-08-19',
  description: 'Re-branding',
  paymentTerms: 1,
  clientName: 'Jensen Huang',
  clientEmail: 'jensenh@mail.com',
  status: 'pending',
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
      price: 1800.9,
      total: 1800.9,
    },
  ],
  total: 1800.9,
};

describe('generateData function testing', () => {
  jest.mock('../generateId', () => {
    return jest.fn(() => 'RT3080');
  });

  test('should generate correct data', () => {
    expect(generateData(testData)).toEqual(result);
  });
});
