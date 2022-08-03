import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '../../../test-utils/testUtils';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

import Header from '../Header';

const themeHandler = jest.fn();
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Header compotent testting', () => {
  test('should render component', () => {
    render(<Header themeHandler={themeHandler} theme={'light'} />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('component should have logo', () => {
    render(<Header themeHandler={themeHandler} theme={'light'} />);
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  test('component should have theme button', () => {
    render(<Header themeHandler={themeHandler} theme={'light'} />);
    const themeBtn = screen.getByRole('button');
    expect(themeBtn).toBeInTheDocument();
  });

  test('butoon should have sun icon if it is light theme', () => {
    render(<Header themeHandler={themeHandler} theme={'light'} />);
    const sunIcon = screen.getByTestId('moon');
    expect(sunIcon).toBeInTheDocument();
  });

  test('butoon should have moon icon if it is dark theme', () => {
    render(<Header themeHandler={themeHandler} theme={'dark'} />);
    const moonIcon = screen.getByTestId('sun');
    expect(moonIcon).toBeInTheDocument();
  });

  test('component should have avatar', () => {
    render(<Header themeHandler={themeHandler} theme={'light'} />);
    const avatar = screen.getByAltText('avatar');
    expect(avatar).toBeInTheDocument();
  });

  test('should callen onClick when icon is cliked', () => {
    render(<Header themeHandler={themeHandler} theme={'light'} />);
    const sunIcon = screen.getByTestId('moon');
    fireEvent.click(sunIcon);
    expect(themeHandler).toBeCalled();
  });

  test('Should open "singup" popup after clicking on avatar', async () => {
    render(<Header themeHandler={themeHandler} theme={'light'} />);
    const avatar = screen.getByAltText('avatar');
    act(() => {
      fireEvent.click(avatar);
    });

    await waitFor(() => {
      const btn = screen.queryByTestId('singinPopup');
      expect(btn).toBeInTheDocument();
    });
  });

  test("should close  'singup' popup after clickin on avatar twicw", async () => {
    render(<Header themeHandler={themeHandler} theme={'light'} />);
    const avatar = screen.getByAltText('avatar');
    act(() => {
      fireEvent.click(avatar);
    });

    await waitFor(() => {
      const btn = screen.queryByTestId('singinPopup');
      expect(btn).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(avatar);
    });

    await waitFor(() => {
      const btn = screen.queryByTestId('singinPopup');
      expect(btn).not.toBeInTheDocument();
    });
  });

  test('should call router.push after clickin on logout btn', async () => {
    render(<Header themeHandler={themeHandler} theme={'light'} />);
    const push = jest.fn();
    // @ts-ignore
    useRouter.mockImplementation(() => ({ push }));
    const avatar = screen.getByAltText('avatar');
    act(() => {
      fireEvent.click(avatar);
    });

    await waitFor(() => {
      const btn = screen.queryByTestId('singinPopup');
      expect(btn).toBeInTheDocument();
    });

    const signin = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(signin);
    expect(push).toBeCalledWith('/auth');
  });
  test('should call router.push after clickin on logout btn', async () => {
    render(<Header themeHandler={themeHandler} theme={'light'} />, {
      preloadedState: {
        auth: {
          isLogin: true,
          userId: null,
          token: null,
          tokenExpirationDate: null,
        },
      },
    });
    const push = jest.fn();
    const replace = jest.fn();
    // @ts-ignore
    useRouter.mockImplementation(() => ({ push, replace }));
    const avatar = screen.getByAltText('avatar');
    act(() => {
      fireEvent.click(avatar);
    });

    await waitFor(() => {
      const btn = screen.queryByTestId('singinPopup');
      expect(btn).toBeInTheDocument();
    });

    const signin = screen.getByRole('button', { name: 'Log Out' });
    fireEvent.click(signin);

    await waitFor(() => {
      expect(replace).toBeCalled();
    });
  });

  test('document.body.style.overflow be visible then modal is closed', () => {
    render(<Header themeHandler={themeHandler} theme={'light'} />, {
      preloadedState: {
        modal: {
          deleteModal: false,
          formModal: false,
        },
      },
    });
    expect(document.body).toHaveStyle('overflow: visible;');
  });
  test('document.body.style.overflow be hidden then modal is open', () => {
    render(<Header themeHandler={themeHandler} theme={'light'} />, {
      preloadedState: {
        modal: {
          deleteModal: true,
          formModal: false,
        },
      },
    });
    expect(document.body).toHaveStyle('overflow: hidden;');
  });
});
