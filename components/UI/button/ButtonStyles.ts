import styled from 'styled-components';

import { media } from '../../../styles/GlobalStyles';

export const Button = styled.button`
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 2.4rem;
  height: 4.8rem;
  padding: 0 2.4rem;
  display: flex;
  align-items: center;
  color: var(--color-white);
  font-family: inherit;
  font-weight: bold;
  font-size: var(--font-size-body-m);
  letter-spacing: var(--font-letter-spacing-body-m);
  cursor: pointer;
  transition: all 0.3s ease;

  &.main_btn {
    background-color: var(--color-main-button);

    &.new_invoice {
      padding-left: 0.8rem;
      padding-right: 1.6rem;
      gap: 1.6rem;

      ${media.phone} {
        gap: 0.8rem;
      }
    }

    &:hover {
      background-color: var(--color-main-button-hover);
    }
  }

  &.delete_btn {
    background-color: var(--color-delete-button);

    &:hover {
      background-color: var(--color-delete-button-hover);
    }
  }

  &.edit_btn,
  &.cancel_btn {
    background-color: ${({ theme }) => theme.editBtn};
    color: ${({ theme }) => theme.tertiaryText};
    transition: background 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.editBtnHover};
    }
  }

  &.add_item_btn {
    background-color: ${({ theme }) => theme.addBtn};
    color: ${({ theme }) => theme.tertiaryText};
    display: flex;
    justify-content: center;

    &:hover {
      background-color: ${({ theme }) => theme.addBtnHover};
    }
  }

  &.save_btn {
    background-color: ${({ theme }) => theme.saveBtn};
    color: ${({ theme }) => theme.saveBtnText};

    &:hover {
      background-color: ${({ theme }) => theme.saveBtnHover};
    }
  }

  &.discard_btn {
    background-color: ${({ theme }) => theme.discardBg};
    color: ${({ theme }) => theme.discardText};
    display: flex;
    justify-content: center;
    padding: 0;
    min-width: 9.6rem;

    &:hover {
      background-color: ${({ theme }) => theme.discardHover};
      color: var(--color-discard-text);
    }

    ${media.phone} {
      min-width: 8.4rem;
    }
  }

  &.back_btn {
    background-color: transparent;
    gap: 2.4rem;
    color: ${({ theme }) => theme.mainText};
    align-items: center;
    width: fit-content;
    min-height: 1.85rem;
    max-height: 1.85rem;
    padding: 0;

    p {
      margin-top: 2px;
    }

    &:hover {
      color: ${({ theme }) => theme.totalText};
    }
  }

  &.delete_item_btn {
    background-color: transparent;
    outline: none;
    width: fit-content;
    height: 1.6rem;

    padding: 0;
    display: block;
    border-radius: 0;
    margin-top: 0.5rem;
    justify-self: center;
    align-self: center;

    ${media.phone} {
      margin-top: 1.8rem;
    }

    &:hover {
      svg {
        path {
          fill: var(--color-error);
        }
      }
    }
  }
`;
