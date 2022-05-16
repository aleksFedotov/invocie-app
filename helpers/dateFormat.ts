const dateFormat = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default dateFormat;
