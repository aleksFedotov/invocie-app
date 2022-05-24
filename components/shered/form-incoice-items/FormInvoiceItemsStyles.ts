import styled from 'styled-components';
import { media } from '../../../styles/GlobalStyles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  ul {
    list-style: none;
    ${media.phone} {
      display: flex;
      flex-direction: column;
      gap: 4.8rem;
    }
  }
`;

export const InvoiceItemsHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 5.4rem 10rem 7.5rem 1.4rem;
  gap: 1.6rem;

  p {
    color: ${({ theme }) => theme.quaternaryText};
  }

  ${media.phone} {
    display: none;
  }
`;
