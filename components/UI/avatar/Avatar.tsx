import React from 'react';
import useWindowWidth from '../../../hooks/useWindowWidth';

import { AvatarWrapper } from './AvatarStyles';
import Image from 'next/image';

const Avatar: React.FC<{ image: string; onClick: () => void }> = ({
  image,
  onClick,
}) => {
  // Hooks
  const windowWidth = useWindowWidth();
  // Change image size based on window size
  let imageSize = windowWidth > 800 ? 40 : 32;

  return (
    <AvatarWrapper onClick={onClick}>
      <Image
        src={image}
        width={imageSize}
        height={imageSize}
        alt="avatar"
        data-size={imageSize}
      />
    </AvatarWrapper>
  );
};

export default Avatar;
