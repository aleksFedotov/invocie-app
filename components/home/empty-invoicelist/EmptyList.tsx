import React from 'react';
import Image from 'next/image';
import useWindowWidth from '../../../hooks/useWindowWidth';

import { EmptyListWrapper, EmptyListContent } from './EmptyListStyles';

const EmptyList = () => {
  // Hooks
  const windowWidth = useWindowWidth();
  return (
    <EmptyListWrapper>
      <EmptyListContent>
        {/* depends on widow size from useWindowWidth hook 
        we render image with diffent width and height and differnt text */}
        <Image
          src={'/assets/illustration-empty.svg'}
          width={windowWidth && windowWidth > 650 ? 241 : 194}
          height={windowWidth && windowWidth > 650 ? 200 : 160}
          alt={'empty-list'}
        />
        <h2>There is nothing here</h2>
        <p>
          Create an invoice by clicking the{' '}
          <span>
            {windowWidth && windowWidth > 650 ? 'New Invoice' : 'New'}
          </span>{' '}
          button and get started
        </p>
      </EmptyListContent>
    </EmptyListWrapper>
  );
};

export default EmptyList;
