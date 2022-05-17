import styled from 'styled-components';

interface IAddress {
  align: string;
}

export const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.secondbg};
  border-radius: 0.8rem;
  padding: 4.8rem;
  color: ${({ theme }) => theme.quaternaryText};
`;

export const MainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const MainInfoLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  h2 {
    font-size: var(--font-size-heading-s);
    color: ${({ theme }) => theme.mainText};
    span {
      color: var(--color-light-purple);
    }
  }
`;

export const Address = styled.div<IAddress>`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  font-size: var(--font-size-body-s);
  text-align: ${({ align }) => align};
`;

export const ClientInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10rem;

  h3 {
    font-size: var(--font-size-heading-s);
    color: ${({ theme }) => theme.mainText};
  }

  p {
    color: ${({ theme }) => theme.tertiaryText};
  }
`;

export const Dates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
