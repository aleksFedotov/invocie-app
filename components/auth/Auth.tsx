import React, { useState } from 'react';
import { AuthForm, AuthWrapper, ErorrMessage, Switcher } from './AuthStyles';
import { Button } from '../UI/button/ButtonStyles';
import FormInput from '../UI/form-input/FormInput';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useHttp from '../../hooks/useHttp';
import LoadingSpinner from '../UI/loading/loading-spinner/LoadingSpinner';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/authSlice';
import Ripple from '../UI/ripple/Ripple';
import { useRouter } from 'next/router';

type AuthInputs = {
  email: string;
  password: string;
  passwordConfirmation?: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required('Invalid email'),
  password: yup
    .string()
    .min(6, 'Should be at least 6 characters long')
    .required("Can't be epmty"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match'),
});

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState<boolean>(false);
  const { isLoading, error, sendRequest } = useHttp();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { handleSubmit, control } = useForm<AuthInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
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

      router.push('/');
    } catch (error) {}
  };

  return (
    <AuthWrapper>
      {error && <ErorrMessage>{error}</ErorrMessage>}
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        {isLoading && <LoadingSpinner asOverlay text="Submitting..." />}
        <h1>{isLoginMode ? 'Login' : 'Sign Up'}</h1>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormInput
              id="email"
              placeholder="Email address"
              error={error}
              value={value}
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
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormInput
              id="password"
              placeholder="Password"
              type="password"
              error={error}
              value={value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const data = event.target.value;
                onChange(data);
              }}
            />
          )}
        />
        {!isLoginMode && (
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormInput
                id="passwordConfirmation"
                placeholder="Repeat Password"
                type="password"
                error={error}
                value={value}
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
