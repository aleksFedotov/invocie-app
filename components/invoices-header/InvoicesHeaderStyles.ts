import styled, { css } from 'styled-components';

interface IFilter {
  isOpened: boolean;
}

export const InvoicesHeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const HeaderTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  p {
    color: ${({ theme }) => theme.secondTExt};
  }
`;

export const HeaderCtx = styled.div`
  display: flex;
  gap: 3.8rem;
  align-items: center;
`;

export const InvoiceFitler = styled.div<IFilter>`
  display: flex;
  gap: 1.4rem;
  align-items: center;
  cursor: pointer;
  span {
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
