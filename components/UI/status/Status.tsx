import React from 'react';

import { StatusWrapper } from './StatusStyles';

const Status: React.FC<{ status: string }> = ({ status }) => {
  return (
    <StatusWrapper status={status}>
      <span></span>
      <p>{status}</p>
    </StatusWrapper>
  );
};

export default Status;
