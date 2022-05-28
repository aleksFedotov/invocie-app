import React, { useState, useEffect } from 'react';
import { RippleContainer } from './RippleStyles';

interface IRipplrArray {
  x: number;
  y: number;
  size: number;
}

const useDebouncedRippleCleanUp = (
  rippleCount: number,
  duration: number,
  cleanUpFunction: () => void
) => {
  useEffect(() => {
    let bounce: ReturnType<typeof setTimeout>;
    if (rippleCount > 0) {
      // clearTimeout(bounce);

      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration * 2);
    }

    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
};

const Ripple: React.FC<{ duration: number; color: string }> = ({
  duration,
  color,
}) => {
  const [rippleArray, setRippleArray] = useState<IRipplrArray[]>([]);

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });

  const addRipple = (event: React.MouseEvent<HTMLElement>) => {
    const rippleContainer = event.currentTarget!.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple = {
      x,
      y,
      size,
    };

    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <RippleContainer
      duration={duration}
      color={color}
      onMouseDown={addRipple}
      data-testid="ripple-container"
    >
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              data-testid="ripple"
              key={'span' + index}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          );
        })}
    </RippleContainer>
  );
};

export default Ripple;

// Special thanks to Mahmoud Amine
// check his codesandbox https://codesandbox.io/s/react-button-ripple-effect-z8rqw?from-embed=&file=/src/components/Ripple.js:0-1883
