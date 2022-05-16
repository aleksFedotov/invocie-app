const moneyFormat = (amount: number) => {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2 });
};

export default moneyFormat;
