import { useRef, useEffect } from 'react';

export function toggleElement<T>(array: T[], elem: T): T[] {
  if (array.includes(elem)) {
    return array.filter((e: T) => {
      return e !== elem;
    });
  } else {
    return [...array, elem];
  }
}

export function useInterval(callback: () => void, delay: number) {
  // credit Dan Abramov
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

