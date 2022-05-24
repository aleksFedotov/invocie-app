const moneyFormat = (amount: number) => {
  const totalString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
  return totalString;
  // return amount.toLocaleString('en-GB', { minimumFractionDigits: 2 });
};

export default moneyFormat;
