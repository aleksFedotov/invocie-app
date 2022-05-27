import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface IModal {
  type: string;
}

export const ModalWrapper = styled(motion.div)`
  width: fit-content;
  height: fit-content;
`;

export const ModalOverlay = styled(motion.div)<IModal>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  ${(props) =>
    props.type === 'delete' &&
    css`
      z-index: 6;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;
