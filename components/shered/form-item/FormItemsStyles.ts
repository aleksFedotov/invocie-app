import styled from 'styled-components';
import { media } from '../../../styles/GlobalStyles';

export const InvoiceItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 5.4rem 10rem 7.5rem 1.4rem;
  gap: 1.6rem;

  > *:nth-child(4) {
    input {
      padding: 1.6rem 0;
    }
  }

  ${media.phone} {
    grid-template-columns: 6.4rem 9rem 11rem 1.3rem;
    grid-template-areas: 'name name name name' 'qty price total delete';

    > *:nth-child(1) {
      grid-area: name;
    }
    > *:nth-child(2) {
      grid-area: qty;
    }
    > *:nth-child(3) {
      grid-area: price;
    }
    > *:nth-child(4) {
      grid-area: total;
    }
    > *:nth-child(5) {
      grid-area: delete;
      justify-self: center;
      align-self: center;
    }
  }
`;
