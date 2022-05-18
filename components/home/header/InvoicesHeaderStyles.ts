import styled, { css } from 'styled-components';

import { media } from '../../../styles/GlobalStyles';

interface IFilter {
  isOpened: boolean;
}

export const InvoicesHeaderWrapper = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 4.5rem;

  ${media.tablet} {
    margin-top: 2.3rem;
  }

  ${media.phone} {
    margin-top: 0;
  }
`;

export const HeaderTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  p {
    color: ${({ theme }) => theme.secondTExt};
  }

  ${media.phone} {
    h1 {
      font-size: var(--font-size-heading-m);
    }
  }
`;

export const HeaderCtx = styled.div`
  display: flex;
  gap: 3.8rem;
  align-items: center;

  ${media.phone} {
    gap: 1.8rem;
  }
`;

export const InvoiceFitler = styled.div<IFilter>`
  display: flex;
  gap: 1.4rem;
  align-items: center;
  cursor: pointer;
  span {
    font-weight: 700;
    color: ${({ theme }) => theme.mainText};
  }

  svg {
    transition: transform 0.3s ease;
  }

  ${(props) =>
    props.isOpened &&
    css`
      svg {
        transform: rotate(180deg);
      }
    `}
`;

export const PlusIconWrapper = styled.div`
  background-color: var(--color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
`;
