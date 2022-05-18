import React from 'react';

import { ButtonsWrapper } from './ViewButtonsStyles';
import { Button } from '../../UI/button/ButtonStyles';

const ViewButtons: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <ButtonsWrapper mobile={isMobile}>
      <Button className="edit_btn">Edit</Button>
      <Button className="delete_btn">Delete</Button>
      <Button className="main_btn">Mark as Read</Button>
    </ButtonsWrapper>
  );
};

export default ViewButtons;
