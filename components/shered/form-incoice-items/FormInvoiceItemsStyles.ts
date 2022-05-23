import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

export const InvoiceItemsHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 4.6rem 10rem 7.5rem 1.4rem;
  gap: 1.6rem;

  p {
    color: ${({ theme }) => theme.quaternaryText};
  }
`;

export const InvoiceItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 4.6rem 10rem 7.5rem 1.4rem;
  gap: 1.6rem;
  justify-items: center;
  align-items: center;
`;
