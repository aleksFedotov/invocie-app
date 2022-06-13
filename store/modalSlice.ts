import { createSlice } from '@reduxjs/toolkit';
import type { AppState } from './store';

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
export const selectDeleteModal = (state: AppState) => state.modal.deleteModal;
export const selectformModal = (state: AppState) => state.modal.formModal;

export const modalReducer = ModalSlice.reducer;
