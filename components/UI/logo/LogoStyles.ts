import styled from 'styled-components';

import { media } from '../../../styles/GlobalStyles';

export const LogoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 10.3rem;
  background-color: var(--color-main-button);
  border-radius: 0 2rem 2rem 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${media.tablet} {
    width: 8rem;
    height: 100%;
  }

  ${media.phone} {
    width: 7.2rem;
  }

  &::after {
    position: absolute;
    top: 50%;
    content: '';
    width: 100%;
    z-index: 0;

    height: 10.3rem;
    background-color: var(--color-main-button-hover);
    border-radius: 0 2rem 2rem 0;
  }

  img {
    position: relative;
    z-index: 1;
  }
`;
