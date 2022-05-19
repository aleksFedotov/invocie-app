import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface IModal {
  type: string;
}

export const Backdrop = styled(motion.div)<IModal>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.45);
  padding: 0 2.4rem;
  z-index: ${({ type }) => (type === 'delete' ? '10' : '2')};

  ${(props) =>
    props.type === 'delete' &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;
