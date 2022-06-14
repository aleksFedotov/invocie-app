import styled, { css } from 'styled-components';
import { media } from '../../../styles/GlobalStyles';

interface IButtons {
  mobile: boolean;
}

export const ButtonsWrapper = styled.div<IButtons>`
  position: ${({ mobile }) => (mobile ? 'fixed' : 'initial')};
  bottom: ${({ mobile }) => (mobile ? '0' : 'none')};
  left: ${({ mobile }) => (mobile ? '0' : 'none')};
  padding: ${({ mobile }) => (mobile ? '2.2rem 2.4rem' : '0')};
  width: ${({ mobile }) => (mobile ? '100%' : 'initial')};
  display: flex;
  justify-content: center;
  gap: ${({ mobile }) => (mobile ? '2rem' : '0.8rem')};
  background-color: ${({ theme }) => theme.secondbg};
  transition: background-color 0.3s ease;

  ${media.phone} {
    display: ${({ mobile }) => (mobile ? 'flex' : 'none')};
  }

  ${media.phone_s} {
    gap: 0.8rem;
  }
`;
