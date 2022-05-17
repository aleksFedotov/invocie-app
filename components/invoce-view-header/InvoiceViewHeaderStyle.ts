import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  max-width: 100%;
  width: 100%;
  padding: 2rem 3.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1rem 1rem -1rem ${({ theme }) => theme.boxShadow};
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.secondbg};
  margin-top: 3.2rem;
  margin-bottom: 2.4rem;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  span {
    color: ${({ theme }) => theme.tertiaryText};
  }
`;
export const HeaderRight = styled.div`
  display: flex;
  gap: 0.8rem;
`;
