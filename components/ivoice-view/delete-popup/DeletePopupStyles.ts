import { motion } from 'framer-motion';
import styled from 'styled-components';
import { media } from '../../../styles/GlobalStyles';

export const PoupWrapper = styled(motion.div)`
  background-color: ${({ theme }) => theme.secondbg};
  border-radius: 0.8rem;
  padding: 4.8rem;
  max-width: 48rem;
  width: 100%;
  margin: 0 2.4rem;

  transform: translateX(50%);

  z-index: 11;

  h2 {
    font-size: var(--font-size-heading-xm);
    color: ${({ theme }) => theme.mainText};
    margin-bottom: 1.2rem;
  }

  p {
    color: ${({ theme }) => theme.deleteText};
    line-height: var(--font-line-heading-m);
  }

  ${media.phone} {
    padding: 3.2rem;

    h2 {
      font-size: var(-font-size-heading-m);
    }
  }
`;

export const PopupButtons = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-left: auto;
  margin-top: 2.4rem;
  width: fit-content;
`;
