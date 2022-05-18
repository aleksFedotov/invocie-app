import styled from 'styled-components';

import { media } from '../../../styles/GlobalStyles';

export const Wrapper = styled.div;

export const TableWrapper = styled.div`
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.editBtn};
  transition: background 0.3s;
  overflow: hidden;
  margin-top: 4.5rem;

  ${media.phone} {
    margin-top: 4;
  }
`;

export const Table = styled.table`
  width: 100%;

  border-spacing: 0;
  padding: 3.2rem;
`;

// TABLE HEAD

export const TableHead = styled.thead`
  display: table-header-group;
  color: ${({ theme }) => theme.quaternaryText};
  font-size: var(--font-size-body-s);

  th {
    text-align: end;
  }

  th:nth-child(1) {
    text-align: start;
  }

  th:nth-child(2) {
    text-align: center;
  }

  th:last-child {
    width: 8rem;
  }

  &::after {
    height: 2rem;
    display: table-row;
    content: '';
  }
`;

// TABLE BODY

export const TableBody = styled.tbody`
  td {
    color: ${({ theme }) => theme.mainText};
    font-size: var(--font-size-body-m);
    font-family: 'Spartan-Bold';
  }

  tr {
    &::after {
      height: 4rem;
      display: table-row;
      content: '';
    }
  }
`;

export const ItemName = styled.td`
  text-align: start;
`;

export const ItemNameContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemQuantity = styled.td`
  text-align: center;
`;

export const ItemPrice = styled.td`
  text-align: end;
`;

export const ItemTotal = styled.td`
  text-align: end;
`;

// TABLE FOOTER

export const TableFooter = styled.div`
  background: ${({ theme }) => theme.tableFooter};
  transition: background 0.3s;
  color: var(--color-white);
  padding: 2.4rem 3.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Amount = styled.p`
  font-size: var(--font-size-body-s);
`;

export const Total = styled.h3`
  font-size: 2.4rem;
  font-family: 'Spartan-Bold';

  ${media.phone_s} {
    font-size: var(--font-size-heading-m);
  }
`;

// TABLE MOBILE

export const MobileTable = styled.ol`
  padding: 2.4rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  font-family: 'Spartan-Bold';
`;

export const InvoiceItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.mainText};
`;

export const ItemLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  span {
    color: ${({ theme }) => theme.totalText};
  }
`;
