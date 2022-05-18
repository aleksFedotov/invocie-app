import styled from 'styled-components';
import { media } from '../../../styles/GlobalStyles';

export const LinkWrapper = styled.div`
  display: flex;
  gap: 2.2rem;
  cursor: pointer;
  font-family: 'Spartan-Bold';
  margin-top: 3rem;

  p {
    color: ${({ theme }) => theme.mainText};
  }
  ${media.tablet} {
    margin-top: 1.6rem;
  }

  ${media.phone} {
    margin-top: 0;
  }
`;
