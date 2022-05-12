import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from '../Header';

const themeHandler = jest.fn();

const mockHeader = (theme: string) => {
  return <Header themeHandler={themeHandler} theme={theme} />;
};

describe('Header compotent testting', () => {
  test('should render component', () => {
    render(mockHeader('light'));
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('component should have logo', () => {
    render(mockHeader('light'));
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  test('component should have theme button', () => {
    render(mockHeader('light'));
    const themeBtn = screen.getByRole('button');
    expect(themeBtn).toBeInTheDocument();
  });

  test('butoon should have sun icon if it is light theme', () => {
    render(mockHeader('light'));
    const sunIcon = screen.getByTestId('sun');
    expect(sunIcon).toBeInTheDocument();
  });

  test('butoon should have moon icon if it is dark theme', () => {
    render(mockHeader('dark'));
    const moonIcon = screen.getByTestId('moon');
    expect(moonIcon).toBeInTheDocument();
  });

  test('component should have avatar', () => {
    render(mockHeader('light'));
    const avatar = screen.getByAltText('avatar');
    expect(avatar).toBeInTheDocument();
  });

  test('should callen onClick when icon is cliked', () => {
    render(mockHeader('light'));
    const sunIcon = screen.getByTestId('sun');
    fireEvent.click(sunIcon);
    expect(themeHandler).toBeCalled();
  });
});
