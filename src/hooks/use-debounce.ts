import { useCallback, useRef } from 'react';

export const useDebounce = <
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(
  callback: T,
  delay: number = 1000
) => {
  const timeout = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );
};
