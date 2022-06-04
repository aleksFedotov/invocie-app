import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from '../../styles/GlobalStyles';

export const MainHeader = styled.header`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 5;

  width: 10.3rem;
  border-radius: 0 2rem 2rem 0;
  justify-content: space-between;

  height: 100vh;
  background-color: var(--color-mirage);

  ${media.tablet} {
    flex-direction: row;
    width: 100%;
    height: 8rem;
    border-radius: 0;
  }

  ${media.phone} {
    height: 7.2rem;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;

  ${media.tablet} {
    flex-direction: row;
  }
`;

export const ThemeSwitcher = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  transition: transform 0.3s ease;

  &:hover {
    svg {
      path {
        fill: #dfe3fa;
      }
    }
  }
  &:active {
    transform: scale(0.95);
  }
`;

export const SingInPopup = styled(motion.div)`
  width: 12rem;
  position: absolute;
  background-color: ${({ theme }) => theme.secondbg};
  border-radius: 0.8rem;
  padding: 1rem;
  bottom: 2rem;
  left: 12rem;
  button {
    height: 4rem;
  }

  ${media.tablet} {
    bottom: initial;
    left: initial;
    right: 3rem;
    top: 9rem;
  }

  ${media.phone} {
    top: 8rem;
  }
`;
