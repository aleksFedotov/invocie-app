import React, { useState } from 'react';
import { AuthWrapper } from './AuthStyles';
import { Button } from '../UI/button/ButtonStyles';
const Auth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <AuthWrapper>
      <h1>{isLogin ? 'Login' : 'Signin'}</h1>
      <Button className="main_btn auth_btn">
        {isLogin ? 'Login to your account' : 'Create an account'}
      </Button>
    </AuthWrapper>
  );
};

export default Auth;
