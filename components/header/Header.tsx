import React, { useEffect, useState } from 'react';
import { destroyCookie } from 'nookies';

import {
  ThemeSwitcher,
  HeaderContent,
  MainHeader,
  SingInPopup,
} from './HeaderStyles';
import Logo from '../UI/logo/Logo';
import Avatar from '../UI/avatar/Avatar';
import MoonIcon from '../../public/assets/icon-moon.svg';
import SunIcon from '../../public/assets/icon-sun.svg';
import { selectDeleteModal, selectformModal } from '../../store/modalSlice';
import { selectAuth } from '../../store/authSlice';
import { useAppSelector } from '../../store/hooks';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/authSlice';
import { Button } from '../UI/button/ButtonStyles';
import Ripple from '../UI/ripple/Ripple';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';

const Header: React.FC<{ themeHandler: () => void; theme: string }> = ({
  themeHandler,
  theme,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const deleteModal = useAppSelector(selectDeleteModal);
  const formModal = useAppSelector(selectformModal);
  const { isLogin } = useAppSelector(selectAuth);
  const [isSingUpShown, setisSignUpShown] = useState<boolean>(false);
  const refreshData = () => router.replace(router.asPath);

  useEffect(() => {
    document.body.style.overflow = 'visible';
    if (deleteModal || formModal) {
      document.body.style.overflow = 'hidden';
    }
  }, [deleteModal, formModal]);

  const clickHandler = () => {
    if (isLogin) {
      destroyCookie(null, 'userData');
      refreshData();
      dispatch(logout());
    } else {
      router.push('/auth');
    }
    setisSignUpShown((prevState) => !prevState!);
  };

  const popupAnimation = {
    hidden: {
      scale: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <MainHeader>
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
        <Avatar
          image={'/assets/image-avatar.jpg'}
          onClick={() => {
            setisSignUpShown((prevState) => !prevState);
          }}
        />
      </HeaderContent>
      <AnimatePresence>
        {isSingUpShown && (
          <SingInPopup
            variants={popupAnimation}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Button className="main_btn auth_btn" onClick={clickHandler}>
              {isLogin ? 'Log Out' : 'Sign In'}
              <Ripple color="var(--color-white)" duration={1000} />
            </Button>
          </SingInPopup>
        )}
      </AnimatePresence>
    </MainHeader>
  );
};

export default Header;
