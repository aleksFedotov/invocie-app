import React from 'react';

import { HeaderWrapper, ThemeSwitcher, HeaderContent } from './HeaderStyles';
import Logo from '../UI/logo/Logo';
import Avatar from '../UI/avatar/Avatar';
import MoonIcon from '../../public/assets/icon-moon.svg';
import SunIcon from '../../public/assets/icon-sun.svg';

const Header: React.FC<{ themeHandler: () => void; theme: string }> = ({
  themeHandler,
  theme,
}) => {
  return (
    <HeaderWrapper>
      <Logo />
      <HeaderContent>
        <ThemeSwitcher
          onClick={() => {
            themeHandler();
          }}
        >
          {theme === 'light' ? (
            <SunIcon data-testid="sun" />
          ) : (
            <MoonIcon data-testid="moon" />
          )}
        </ThemeSwitcher>
        <Avatar image={'/assets/image-avatar.jpg'} />
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
