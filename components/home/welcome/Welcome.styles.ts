import styled from 'styled-components';

import { media } from '../../../styles/GlobalStyles';

export const WelcomeWrapper = styled.div`
  display: flex;
  margin-top: 10rem;
  align-items: center;
  gap: 2.4rem;
  justify-content: center;

  ${media.phone} {
    flex-direction: column;
    align-items: center;
  }
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  max-width: 20rem;
  width: 100%;

  p {
    font-size: 1.6rem;
    line-height: normal;
  }

  h1 {
    span {
      color: var(--color-purple);
    }
  }

  ${media.phone} {
    text-align: center;
    max-width: 35rem;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  ${media.phone} {
    justify-content: center;
  }
`;
