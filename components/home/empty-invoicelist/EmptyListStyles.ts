import styled from 'styled-components';

import { media } from '../../../styles/GlobalStyles';

export const EmptyListWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  ${media.tablet} {
    height: calc(100% - 19rem);
  }
`;

export const EmptyListContent = styled.div`
  text-align: center;
  max-width: 24.1rem;
  width: 100%;

  ${media.tablet} {
    max-width: 21.7rem;
  }

  h2 {
    font-size: var(--font-size-heading-m);
    color: ${({ theme }) => theme.mainText};
    margin-top: 6.4rem;
    margin-bottom: 2.9rem;
  }

  p {
    color: ${({ theme }) => theme.tertiaryText};
  }

  span {
    font-weight: 700;
  }

  p,
  h2 {
    width: 22rem;
  }
`;
