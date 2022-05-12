import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<undefined | number>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const changeWidth = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', changeWidth);

      changeWidth();

      return () => window.removeEventListener('resize', changeWidth);
    }
  }, []);
  return windowWidth;
};

export default useWindowWidth;
