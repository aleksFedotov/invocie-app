import React from 'react';

import { HeaderWrapper } from './HeaderStyles';

const Header: React.FC<{ themeHandler: () => void; theme: string }> = ({
  themeHandler,
  theme,
}) => {
  return <HeaderWrapper></HeaderWrapper>;
};

export default Header;
