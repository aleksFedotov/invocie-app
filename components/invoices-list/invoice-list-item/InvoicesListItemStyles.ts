import styled from 'styled-components';

import { media } from '../../../styles/GlobalStyles';

export const ListItem = styled.li`
  background-color: ${({ theme }) => theme.secondbg};
  padding: 1.6rem 3.2rem;
  border: 1px solid transparent;
  border-radius: 0.8rem;
  box-shadow: 0 1rem 1rem -1rem ${({ theme }) => theme.boxShadow};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: border 0.5s ease;

  ${media.tablet_s} {
    padding: 2.4rem;
  }

  ${media.phone} {
    margin: 0 auto;
    align-items: initial;
    max-width: 45rem;
    width: 100%;
  }

  &:hover {
    border: 1px solid var(--color-purple);
  }
`;

export const ListItemLeft = styled.div`
  display: flex;
  gap: 3.5rem;
  align-items: center;

  ${media.tablet_s} {
    gap: 2rem;
  }

  ${media.phone} {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }
`;

export const ListItemRight = styled.div`
  display: flex;
  align-items: center;

  ${media.phone} {
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export const InvoiceId = styled.h3`
  font-size: var(--font-size-body-m);
  width: 5.6rem;

  span {
    color: var(--color-ship-cove);
  }

  ${media.phone} {
    margin-bottom: 2.4rem;
  }
`;

export const DueDate = styled.p`
  color: ${({ theme }) => theme.tertiaryText};
  width: 11.5rem;

  ${media.phone} {
    margin-bottom: 0.8rem;
  }
`;

export const ClientName = styled.p`
  color: ${({ theme }) => theme.secondTExt};
`;

export const Total = styled.h2`
  font-size: var(--font-size-heading-s);
`;
