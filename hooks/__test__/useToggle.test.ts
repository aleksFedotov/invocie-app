import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useToggle from '../useToggle';

describe('useToggle testing', () => {
  test('initial value false', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toEqual(false);
  });
  test('value should change to true', async () => {
    const { result } = renderHook(() => useToggle());
    act(() => {
      result.current[1].on();
    });
    expect(result.current[0]).toEqual(true);
  });
  test('value should change to false', async () => {
    const { result } = renderHook(() => useToggle(true));
    act(() => {
      result.current[1].off();
    });
    expect(result.current[0]).toEqual(false);
  });
  test('value should change to true then to false', async () => {
    const { result } = renderHook(() => useToggle());
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toEqual(true);
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toEqual(false);
  });
});
