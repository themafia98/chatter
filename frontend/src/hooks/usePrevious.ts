import { useEffect, useRef } from 'react';

const usePrevious = (value: string): string => {
  const prevValue = useRef(value);

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return prevValue.current;
};

export default usePrevious;