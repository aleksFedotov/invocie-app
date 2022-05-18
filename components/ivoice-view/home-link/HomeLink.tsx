import React from 'react';
import Link from 'next/link';
import ArrowLeftIcon from '../../../public/assets/icon-arrow-left.svg';

import { LinkWrapper } from './HomeLinkStyles';

const HomeLink: React.FC = () => {
  return (
    <Link href={'/'}>
      <LinkWrapper>
        <ArrowLeftIcon />
        <p>Go back</p>
      </LinkWrapper>
    </Link>
  );
};

export default HomeLink;
