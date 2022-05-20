import styled from 'styled-components';

import { motion } from 'framer-motion';
import { media } from '../../../styles/GlobalStyles';

export const FormWrapper = styled(motion.form)`
  z-index: 3;
  max-width: 62rem;
  max-height: 100vh;
  width: 100%;
  border-radius: 0 2rem 2rem 0;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 10.3rem;
  background-color: ${({ theme }) => theme.mainBg};
  padding: 5.6rem;
  padding-right: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 4.8rem;

  h2 {
    font-size: var(--font-size-heading-xm);
    color: ${({ theme }) => theme.mainText};
  }

  ${media.tablet} {
    top: 8rem;
    left: 0;
  }

  ${media.phone} {
    top: 7.2rem;
    padding: 2.4rem;
  }
`;

export const Wrapper = styled.div`
  padding-right: 2.4rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.mainBg};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.scroll};
    border-radius: 20px;
    height: 20px;
  }

  &::-webkit-scrollbar {
    width: 12px;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  color: var(--color-purple);
`;

export const InputsGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
`;

export const BillFromSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
  grid-template-areas:
    'address address address'
    'city code country';

  > *:nth-child(1) {
    grid-area: address;
  }
  > *:nth-child(2) {
    grid-area: city;
  }
  > *:nth-child(3) {
    grid-area: code;
  }
  > *:nth-child(4) {
    grid-area: country;
  }
`;

export const BillToSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
  grid-template-areas:
    'name name name'
    'email email email'
    'address address address'
    'city code country';

  > *:nth-child(1) {
    grid-area: name;
  }
  > *:nth-child(2) {
    grid-area: email;
  }
  > *:nth-child(3) {
    grid-area: address;
  }
  > *:nth-child(4) {
    grid-area: city;
  }
  > *:nth-child(5) {
    grid-area: code;
  }
  > *:nth-child(6) {
    grid-area: country;
  }
`;

export const BottomSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.4rem;
  grid-template-areas:
    'date terms'
    'descrition descrition';

  > *:nth-child(1) {
    grid-area: date;
  }
  > *:nth-child(2) {
    grid-area: terms;
  }
  > *:nth-child(3) {
    grid-area: descrition;
  }
`;
