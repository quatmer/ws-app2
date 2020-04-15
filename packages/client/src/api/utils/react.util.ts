import React, { useEffect } from 'react';

const logMounted = true;
export const useIsMounted = (logName?: string) => {
  const isMounted = React.useRef(true);
  if (logName && logMounted) console.log(`%c[${logName}]: mounted`, `color: green;`);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (logName && logMounted) console.log(`%c[${logName}]: unmounted`, `color: red;`);
    };
    //eslint-disable-next-line
  }, []);

  return isMounted;
};
