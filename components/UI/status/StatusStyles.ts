import styled, { css } from 'styled-components';

import { media } from '../../../styles/GlobalStyles';

interface IStatus {
  status: string;
}

export const StatusWrapper = styled.div<IStatus>`
  width: 10.4rem;
  height: 4rem;
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-family: 'Spartan-Bold';
  text-transform: capitalize;
  margin-left: 4rem;
  margin-right: 2rem;

  ${media.phone} {
    margin-left: 0;
    margin-right: 0;
  }

  p {
    margin-top: 0.2rem;
  }

  span {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
  }

  ${({ status }) =>
    status === 'paid' &&
    css`
      background-color: var(--color-status-paid-bg);
      color: var(--color-status-paid-text);

      span {
        background-color: var(--color-status-paid-text);
      }
    `}
  ${({ status }) =>
    status === 'pending' &&
    css`
      background-color: var(--color-status-pending-bg);
      color: var(--color-status-pending-text);

      span {
        background-color: var(--color-status-pending-text);
      }
    `}
  ${({ status }) =>
    status === 'draft' &&
    css`
      background-color: ${({ theme }) => theme.statusDraft};
      color: ${({ theme }) => theme.statusDraftText};

      span {
        background-color: ${({ theme }) => theme.statusDraftText};
      }
    `}
`;
