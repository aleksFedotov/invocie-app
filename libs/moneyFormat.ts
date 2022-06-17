const moneyFormat = (amount: number) => {
  const formatedAmount = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
  return formatedAmount;
};

export default moneyFormat;
