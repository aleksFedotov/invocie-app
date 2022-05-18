import styled from 'styled-components';

import { media } from '../../styles/GlobalStyles';

export const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;

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
