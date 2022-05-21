import React from 'react';

interface IToggle {
  on: () => void;
  off: () => void;
  toggle: () => void;
}

function useToggle(initialState: boolean = false): [boolean, IToggle] {
  const [toggle, setToogle] = React.useState(initialState);

  const handlers = React.useMemo(
    () => ({
      on: () => {
        setToogle(true);
      },
      off: () => {
        setToogle(false);
      },
      toggle: () => {
        setToogle((prev) => !prev);
      },
    }),
    [setToogle]
  );

  return [toggle, handlers];
}

export default useToggle;
