import styled from 'styled-components';
import { motion } from 'framer-motion';
import { media } from '../../../styles/GlobalStyles';

export const FiltersWrapper = styled(motion.div)`
  position: absolute;
  z-index: 2;
  bottom: -13.5rem;
  right: 15.5rem;
  width: 19.2rem;
  padding: 2.4rem;
  background-color: ${({ theme }) => theme.dropFiltersBd};
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  box-shadow: 0 1rem 2rem 0 ${({ theme }) => theme.boxShadow};
  transition: background-color ease 0.3s;

  ${media.phone} {
    right: 6rem;
  }
`;
