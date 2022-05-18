import styled from 'styled-components';

import { media } from '../../../styles/GlobalStyles';

export const List = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.6rem;
  margin-top: 6.5rem;

  ${media.tablet} {
    margin-top: 5.6rem;
  }

  ${media.phone} {
    margin-top: 3.2rem;
  }
`;
