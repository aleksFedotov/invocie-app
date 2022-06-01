import styled from 'styled-components';

import { media } from '../../styles/GlobalStyles';

export const AuthWrapper = styled.form`
  max-width: 40rem;
  width: 100%;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.secondbg};
  padding: 3.2rem;
  margin: 0 auto;
  margin-top: 50%;

  ${media.phone} {
    padding: 3.2rem 2.4rem;
  }

  h1 {
    font-size: var(--font-size-heading-xm);
    color: ${({ theme }) => theme.mainText};
  }
`;
