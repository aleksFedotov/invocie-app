import store from '../store';
import { login, logout } from '../authSlice';

describe('aurhSlice testing', () => {
  test('should have correct  initial state', () => {
    const isLogin = store.getState().auth.isLogin;
    const userId = store.getState().auth.userId;
    const token = store.getState().auth.token;
    const tokenExpirationDate = store.getState().auth.tokenExpirationDate;
    expect(isLogin).toEqual(false);
    expect(userId).toEqual(null);
    expect(token).toEqual(null);
    expect(tokenExpirationDate).toEqual(null);
  });
  test('should store correct auth data after login', () => {
    store.dispatch(
      login({ userId: '1', token: 'token', tokenExpirationDate: '22-05-06' })
    );
    const isLogin = store.getState().auth.isLogin;
    const userId = store.getState().auth.userId;
    const token = store.getState().auth.token;
    const tokenExpirationDate = store.getState().auth.tokenExpirationDate;
    expect(isLogin).toEqual(true);
    expect(userId).toEqual('1');
    expect(token).toEqual('token');
    expect(tokenExpirationDate).toEqual('22-05-06');
  });

  test('should reset  auth data after logout', () => {
    store.dispatch(
      login({ userId: '1', token: 'token', tokenExpirationDate: '22-05-06' })
    );
    store.dispatch(logout());
    const isLogin = store.getState().auth.isLogin;
    const userId = store.getState().auth.userId;
    const token = store.getState().auth.token;
    const tokenExpirationDate = store.getState().auth.tokenExpirationDate;
    expect(isLogin).toEqual(false);
    expect(userId).toEqual(null);
    expect(token).toEqual(null);
    expect(tokenExpirationDate).toEqual(null);
  });
});
