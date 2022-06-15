import React, { useState } from 'react';
import { AuthForm, AuthWrapper, ErorrMessage, Switcher } from './AuthStyles';
import { Button } from '../UI/button/ButtonStyles';
import FormInput from '../UI/form-input/FormInput';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useHttp from '../../hooks/useHttp';
import LoadingSpinner from '../UI/loading/LoadingSpinner';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/authSlice';
import { logoutDemo } from '../../store/demoSlice';
import Ripple from '../UI/ripple/Ripple';
import { useRouter } from 'next/router';

type AuthInputs = {
  email: string;
  password: string;
  passwordConfirmation?: string;
};

// Schema for validation in react hook form for login
const schemaLogin = yup.object().shape({
  // Should be correct email
  email: yup.string().email().required('Invalid email'),
  // Password field should not be empty and should have length at least 6
  password: yup
    .string()
    .min(6, 'Should be at least 6 characters long')
    .required("Can't be epmty"),
});

// Schema for validation in react hook form for sing up
const schemaSignin = yup.object().shape({
  email: yup.string().email().required('Invalid email'),
  password: yup
    .string()
    .min(6, 'Should be at least 6 characters long')
    .required("Can't be epmty"),
  // Repeated password should not be empty and should be the same as pasword
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required("Can't be epmty"),
});

const Auth: React.FC = () => {
  // States
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);

  // Hooks
  const { isLoading, error: httpError, sendRequest } = useHttp();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { handleSubmit, control } = useForm<AuthInputs>({
    // depends on auth mode we have diffent validation schema
    resolver: yupResolver(isLoginMode ? schemaLogin : schemaSignin),
  });

  // Submit Handler
  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    // First create expiration date and then send request login request to
    // server with senRequest function, if everything is ok we dispacth logn action
    //  and demoLogout action. So we have all user data stored in global state and
    //  app do not render demo data. After that we redirect app to home paage
    try {
      const tokenExpirationDate = new Date(
        new Date().getTime() + 1000 * 60 * 60
      ).toString();
      const userData = await sendRequest({
        url: isLoginMode ? '/api/login' : '/api/singin',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          expirationDate: tokenExpirationDate,
        }),
      });

      dispatch(
        login({
          userId: userData.id,
          token: userData.token,
          tokenExpirationDate,
        })
      );

      dispatch(logoutDemo());

      router.push('/');
    } catch (error) {}
  };

  return (
    <AuthWrapper>
      {/* If useHttp returns error display here */}
      {httpError && <ErorrMessage>{httpError}</ErorrMessage>}
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        {/* While request in snedRequest is pending we have loading spinner */}
        {isLoading && <LoadingSpinner asOverlay text="Submitting..." />}
        <h1>{isLoginMode ? 'Login' : 'Sign Up'}</h1>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange }, fieldState: { error } }) => (
            <FormInput
              id="email"
              placeholder="Email address"
              error={error}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const data = event.target.value;
                onChange(data);
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange }, fieldState: { error } }) => (
            <FormInput
              id="password"
              placeholder="Password"
              type="password"
              error={error}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const data = event.target.value;
                onChange(data);
              }}
            />
          )}
        />
        {/* If user try to sing up then it has to repeated password for his new account */}
        {!isLoginMode && (
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormInput
                id="passwordConfirmation"
                placeholder="Repeat Password"
                type="password"
                error={error}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const data = event.target.value;
                  onChange(data);
                }}
              />
            )}
          />
        )}
        <Button className="main_btn auth_btn">
          {isLoginMode ? 'Login to your account' : 'Create an account'}
          <Ripple color="var(--color-white)" duration={1000} />
        </Button>
        {isLoginMode ? (
          <p>
            Don’t have an account?{' '}
            <Switcher
              data-testid="switcher"
              onClick={() => {
                setIsLoginMode(false);
              }}
            >
              Sing up
            </Switcher>
          </p>
        ) : (
          <p>
            Already have an account?{'  '}
            <Switcher
              data-testid="switcher"
              onClick={() => {
                setIsLoginMode(true);
              }}
            >
              Login
            </Switcher>
          </p>
        )}
      </AuthForm>
    </AuthWrapper>
  );
};

export default Auth;
