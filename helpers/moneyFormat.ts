const moneyFormat = (amount: number) => {
  const formatedAmount = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
  // return amount.toLocaleString('en-GB', { minimumFractionDigits: 2 });
  return formatedAmount;
};

export default moneyFormat;
