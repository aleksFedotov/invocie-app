import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface IModalInitialState {
  deleteModal: boolean;
  formModal: boolean;
}

const initialState: IModalInitialState = {
  deleteModal: false,
  formModal: false,
};

export const ModalSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    openDeleteModal(state) {
      state.deleteModal = true;
    },
    closeDeleteModal(state) {
      state.deleteModal = false;
    },
    openFormModal(state) {
      state.formModal = true;
    },
    closeFormModal(state) {
      state.formModal = false;
    },
  },
});

export const {
  openDeleteModal,
  closeDeleteModal,
  openFormModal,
  closeFormModal,
} = ModalSlice.actions;
export const selectDeleteModal = (state: RootState) => state.modal.deleteModal;
export const selectformModal = (state: RootState) => state.modal.formModal;

export const modalReducer = ModalSlice.reducer;
