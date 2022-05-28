import store from '../store';
import {
  openDeleteModal,
  closeDeleteModal,
  openFormModal,
  closeFormModal,
} from '../modalSlice';

describe('modalSlice testing', () => {
  test('should have closed modal initialy', () => {
    const isOpenedDeleteModal = store.getState().modal.deleteModal;
    const isOpenedFormModal = store.getState().modal.formModal;
    expect(isOpenedDeleteModal).toBeFalsy();
    expect(isOpenedFormModal).toBeFalsy();
  });
  test('should open delete modal', () => {
    store.dispatch(openDeleteModal());
    const isOpenedDeleteModal = store.getState().modal.deleteModal;
    expect(isOpenedDeleteModal).toBeTruthy();
  });
  test('should open form modal', () => {
    store.dispatch(openFormModal());
    const isOpenedFormModal = store.getState().modal.formModal;
    expect(isOpenedFormModal).toBeTruthy();
  });
  test('should open delete modal', () => {
    store.dispatch(closeDeleteModal());
    const isOpenedDeleteModal = store.getState().modal.deleteModal;
    expect(isOpenedDeleteModal).toBeFalsy();
  });
  test('should open form modal', () => {
    store.dispatch(closeFormModal());
    const isOpenedFormModal = store.getState().modal.formModal;
    expect(isOpenedFormModal).toBeFalsy();
  });
});
