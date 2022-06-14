import styled from 'styled-components';
import { media } from '../../../styles/GlobalStyles';

interface IAddress {
  align: string;
}

interface IDataContainer {
  margin?: string;
}

export const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.secondbg};
  border-radius: 0.8rem;
  padding: 4.8rem;
  color: ${({ theme }) => theme.quaternaryText};
  transition: background 0.3s;

  ${media.phone} {
    padding: 2.4rem;
    margin-bottom: 9rem;
  }
`;

export const MainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  ${media.phone} {
    flex-direction: column;
    gap: 3rem;
  }
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

  ${media.phone} {
    text-align: start;
  }
`;

export const ClientInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem 0;

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
  margin-right: 9rem;

  ${media.tablet_s} {
    margin-right: 6rem;
  }

  ${media.phone_s} {
    margin-right: 4rem;
  }
`;
export const DataContainer = styled.div<IDataContainer>`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-right: ${({ margin }) => margin};

  ${media.phone_s} {
    margin-right: 0;
  }
`;
