import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  border-radius: 2.4rem;
  height: 4.8rem;
  padding: 0 2.4rem;
  display: flex;
  align-items: center;
  color: var(--color-white);
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;

  &.main_btn {
    background-color: var(--color-main-button);

    &.new_invoice {
      padding: 0;
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

    &:hover {
      background-color: ${({ theme }) => theme.editBtnHover};
    }
  }

  &.add_item_btn {
    background-color: ${({ theme }) => theme.addBtn};
    color: ${({ theme }) => theme.tertiaryText};

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
    background-color: var(--colot-discard-btn);
    color: var(--color-ship-cove);

    &:hover {
      background-color: var(--colot-discard-btn);
    }
  }
`;
