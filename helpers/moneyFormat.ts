const moneyFormat = (amount: number) => {
  return amount.toLocaleString('en-GB', { minimumFractionDigits: 2 });
};

export default moneyFormat;
