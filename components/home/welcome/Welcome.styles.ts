import styled from 'styled-components';

export const WelcomeWrapper = styled.div`
  display: flex;
  margin-top: 10rem;
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  max-width: 20rem;

  p {
    font-size: 1.6rem;
    line-height: normal;
  }

  h1 {
    span {
      color: var(--color-purple);
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
`;
