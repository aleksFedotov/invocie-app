import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { server } from '../../mocks/server';
import fetch from 'node-fetch';

import useHttp from '../useHttp';

// function fetchMock(url: string, suffix = '') {
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       resolve({
//         json: () =>
//           Promise.resolve({
//             data: url + suffix,
//           }),
//       });
//     }, 200 + Math.random() * 300)
//   );
// }

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
    console.log(result);
    expect(result.current.isLoading).toEqual(false);
  });
  test('initital value of error should be null', () => {
    const { result } = renderHook(() => useHttp());
    expect(result.current.error).toEqual(null);
  });
  test('', async () => {
    const { result } = renderHook(() => useHttp());
    await act(() => {
      result.current.sendRequest({
        url: 'test',
      });
    });
  });
});
