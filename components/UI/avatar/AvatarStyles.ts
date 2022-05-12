import styled from 'styled-components';

import { media } from '../../../styles/GlobalStyles';

export const AvatarWrapper = styled.div`
  width: 100%;
  height: 10.3rem;
  border-top: solid 1px #494e6e;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${media.tablet} {
    width: 8rem;
    height: 100%;
    border: none;
    border-left: solid 1px #494e6e;
  }

  ${media.phone} {
    width: 7.2rem;
  }

  img {
    border-radius: 50%;
    ${media.tablet} {
      width: 3.2rem;
      height: 3.2rem;
    }
  }
`;
