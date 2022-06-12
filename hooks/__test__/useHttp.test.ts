import { renderHook, waitFor, act } from '@testing-library/react';

import { server } from '../../mocks/server';
import 'next';
import useHttp from '../useHttp';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useHttp testing', () => {
  test('should exist', () => {
    const { result } = renderHook(() => useHttp());
    expect(result.current).toBeDefined();
  });
  test('initital value of isLoading should be false', () => {
    const { result } = renderHook(() => useHttp());
    expect(result.current.isLoading).toEqual(false);
  });
  test('initital value of error should be null', () => {
    const { result } = renderHook(() => useHttp());
    expect(result.current.error).toEqual(null);
  });
  test('should get status 200 and data if request is solved', () => {
    const { result } = renderHook(() => useHttp());

    waitFor(async () => {
      const response = await result.current.sendRequest({
        url: 'https://test/login',
      });
      expect(response).toEqual({ user: 'alex' });
    });
  });
  test('should get status 500 and error message if request is solved', async () => {
    const { result } = renderHook(() => useHttp());

    waitFor(async () => {
      const response = await result.current.sendRequest({
        url: 'https://test/error',
      });
      expect(response).toEqual({ msg: 'something went wrong' });
      expect(result.current.error).toEqual('something went wrong');
      expect(result.current.sendRequest).toThrowError();
      expect(result.current.isLoading).toEqual(false);
    });
  });

  test('should trigger !res.ok', async () => {
    const { result } = renderHook(() => useHttp());

    await act(async () => {
      const response = result.current.sendRequest({
        url: 'https://test/error',
      });
      await expect(response).rejects.toBeTruthy();
    });
  });
});
