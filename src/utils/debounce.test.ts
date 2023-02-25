import { useEffect, useState } from 'react';
import { describe, it } from 'vitest';
import { useDebounce } from './debounce';

describe('utils - debounce', () => {
  // TODO: fix useState issue outside react components
  const [variable, setVariable] = useState('test');
  const debouncedVariable = useDebounce(variable, 250);

  it(
    'must update variable',
    () =>
      new Promise<void>((resolve) => {
        setVariable('test2');
        useEffect(() => {
          resolve();
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [debouncedVariable]);
      }),
    1000,
  );
});
