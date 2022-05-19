import styled from 'styled-components';

import { motion } from 'framer-motion';

export const FormWrapper = styled(motion.form)`
  max-width: 62rem;
  width: 100%;
  border-radius: 0 0 2rem 2rem;
  position: fixed;
  top: 0;
  bottom: 0;
  left: calc(10.3rem);
  background-color: ${({ theme }) => theme.mainBg};
  padding: 5.6rem;

  h2 {
    font-size: var(--font-size-heading-xm);
    color: ${({ theme }) => theme.mainText};
    margin-bottom: 4.8rem;
  }
`;
