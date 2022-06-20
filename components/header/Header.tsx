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
  // States
  const [isSingUpShown, setisSignUpShown] = useState<boolean>(false);
  // Hooks
  const dispatch = useAppDispatch();
  const router = useRouter();
  const deleteModal = useAppSelector(selectDeleteModal);
  const formModal = useAppSelector(selectformModal);
  const { isLogin } = useAppSelector(selectAuth);
  const refreshData = () => router.replace(router.asPath);

  useEffect(() => {
    // make sure that in modal user could not scroll by adding to body "overflow = 'hidden'"
    // when any modal is opened and change it to .overflow = 'visible' when it is closed

    document.body.style.overflow = 'visible';
    if (deleteModal || formModal) {
      document.body.style.overflow = 'hidden';
    }
  }, [deleteModal, formModal]);

  const singInClickHandler = () => {
    // if it is user id logedin then after click we destroy cookies, refresh data to show most resent data,
    // call logout action from store to cleae global state and return user to main page
    // if user is not logedin when we redirect it to auth page
    if (isLogin) {
      destroyCookie(null, 'userData');
      refreshData();
      dispatch(logout());
      router.push('/');
    } else {
      router.push('/auth');
    }
    setisSignUpShown((prevState) => !prevState!);
  };

  // Animation variants for frame-motion
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
          aria-label="theme-swithcer"
        >
          {theme === 'light' ? (
            <SunIcon data-testid="sun" />
          ) : (
            <MoonIcon data-testid="moon" />
          )}
        </ThemeSwitcher>

        <Avatar
          image={isLogin ? '/assets/image-avatar.jpg' : '/assets/user.png'}
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
            data-testid="singinPopup"
          >
            <Button className="main_btn auth_btn" onClick={singInClickHandler}>
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
