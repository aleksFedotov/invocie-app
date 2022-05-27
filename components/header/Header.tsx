import React, { useEffect } from 'react';

import { ThemeSwitcher, HeaderContent, MainHeader } from './HeaderStyles';
import Logo from '../UI/logo/Logo';
import Avatar from '../UI/avatar/Avatar';
import MoonIcon from '../../public/assets/icon-moon.svg';
import SunIcon from '../../public/assets/icon-sun.svg';
import { selectDeleteModal, selectformModal } from '../../store/modalSlice';
import { useAppSelector } from '../../store/hooks';

const Header: React.FC<{ themeHandler: () => void; theme: string }> = ({
  themeHandler,
  theme,
}) => {
  const deleteModal = useAppSelector(selectDeleteModal);
  const formModal = useAppSelector(selectformModal);

  useEffect(() => {
    document.body.style.overflow = 'visible';
    if (deleteModal || formModal) {
      document.body.style.overflow = 'hidden';
    }
  }, [deleteModal, formModal]);

  return (
    <MainHeader
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}
    >
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
    </MainHeader>
  );
};

export default Header;
