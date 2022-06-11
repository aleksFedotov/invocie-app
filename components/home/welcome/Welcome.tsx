import React from 'react';

import { WelcomeWrapper, TextContent, ButtonsWrapper } from './Welcome.styles';
import { Button } from '../../UI/button/ButtonStyles';
import Ripple from '../../UI/ripple/Ripple';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../store/hooks';
import { loginDemo } from '../../../store/demoSlice';

const Welcome: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const demoHandler = () => {
    dispatch(loginDemo());
    router.push('/');
  };
  return (
    <WelcomeWrapper>
      <TextContent>
        <h1>
          Welcome to <span>Invoice app</span>
        </h1>
        <p>Keep track of your invoices.</p>
        <ButtonsWrapper>
          <Button
            className="main_btn"
            onClick={() => {
              router.push('/auth');
            }}
          >
            Sing Up
            <Ripple color={'var(--color-white)'} duration={1000} />
          </Button>
          <Button className="main_btn" onClick={demoHandler}>
            Demo
            <Ripple color={'var(--color-white)'} duration={1000} />
          </Button>
        </ButtonsWrapper>
      </TextContent>
    </WelcomeWrapper>
  );
};

export default Welcome;
