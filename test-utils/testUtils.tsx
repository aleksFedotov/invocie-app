// import React, { ReactElement } from 'react';
// import { render as rtlRender } from '@testing-library/react';
// import { configureStore } from '@reduxjs/toolkit';
// import { Provider } from 'react-redux';

import { filterReducer } from '../store/filterSlice';
import { modalReducer } from '../store/modalSlice';
import { authReducer } from '../store/authSlice';

import { IAuthInitialState } from '../store/authSlice';
import { IFilterInitialState } from '../store/filterSlice';
import { IModalInitialState } from '../store/modalSlice';

// interface IPreloadedState {
//   auth?: IAuthInitialState;
//   filter?: IFilterInitialState;
//   modal?: IModalInitialState;
// }

// const

// function render(
//   ui: ReactElement,
//   {

//     preloadedState,
//     store = configureStore({
//       reducer: {
//         filter: filterReducer,
//         modal: modalReducer,
//         auth: authReducer,
//       },
//       preloadedState,
//     }),
//     ...renderOptions
//   } = {}
// ) {
//   const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     return <Provider store={store}>{children}</Provider>;
//   };
//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// }

// // re-export everything
// export * from '@testing-library/react';
// // override render method
// export { render };

import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

interface WrapperProps {
  children?: React.ReactNode;
}

function render(ui: any, { route = '/', preloadedState = {} } = {}) {
  window.history.pushState({}, 'Test page', route);
  const store = configureStore({
    reducer: { filter: filterReducer, modal: modalReducer, auth: authReducer },
    preloadedState,
  });

  const Wrapper = ({ children }: WrapperProps) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return rtlRender(ui, { wrapper: Wrapper });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
