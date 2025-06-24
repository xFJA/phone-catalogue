import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value', 500));
    expect(result.current).toBe('initial value');
  });

  it('should not update the value before the delay has elapsed', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial value', delay: 500 },
    });

    rerender({ value: 'updated value', delay: 500 });

    expect(result.current).toBe('initial value');

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('initial value');
  });

  it('should update the value after the delay has elapsed', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial value', delay: 500 },
    });

    rerender({ value: 'updated value', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated value');
  });

  it('should handle multiple updates correctly', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial value', delay: 500 },
    });

    rerender({ value: 'intermediate value', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: 'final value', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('initial value');

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('final value');
  });

  it('should use the default delay when not specified', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'initial value' },
    });

    rerender({ value: 'updated value' });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('updated value');
  });

  it('should handle delay changes correctly', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial value', delay: 500 },
    });

    rerender({ value: 'updated value', delay: 200 });

    act(() => {
      jest.advanceTimersByTime(200);
    });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('updated value');
  });

  it('should clean up timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');

    const { unmount } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'test value', delay: 500 },
    });

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
