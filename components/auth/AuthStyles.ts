import styled from 'styled-components';

import { media } from '../../styles/GlobalStyles';

export const AuthWrapper = styled.div`
  margin: auto;
  max-width: 40rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const ErorrMessage = styled.span`
  color: var(--color-error);
  text-align: center;
`;

export const AuthForm = styled.form`
  position: relative;

  border-radius: 2rem;
  background-color: ${({ theme }) => theme.secondbg};
  padding: 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  ${media.phone} {
    padding: 3.2rem 2.4rem;
  }

  h1 {
    font-size: var(--font-size-heading-xm);
    color: ${({ theme }) => theme.mainText};
    margin-bottom: 0.8rem;
  }

  p {
    text-align: center;
  }

  button {
    margin-top: 1.6rem;
  }
`;

export const Switcher = styled.span`
  color: var(--color-purple);
  cursor: pointer;
`;
