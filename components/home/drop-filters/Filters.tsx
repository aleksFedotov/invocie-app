import React from 'react';

import { FiltersWrapper } from './FiltersStyles';

import CheckBox from '../../UI/chechbox/Checkbox';

const Filters: React.FC = () => {
  const filtersVariants = {
    hidden: {
      scaleY: 0,
    },
    visible: {
      scaleY: 1,

      transition: { duration: 0.3 },
    },
    exit: {
      scaleY: 0,

      transition: { duration: 0.3 },
    },
  };

  return (
    <FiltersWrapper
      data-testid="filters"
      variants={filtersVariants}
      initial="hidden"
      animate="visible"
      style={{ originY: 0 }}
      exit="exit"
    >
      <CheckBox label="Draft" />
      <CheckBox label="Pending" />
      <CheckBox label="Paid" />
    </FiltersWrapper>
  );
};

export default Filters;
