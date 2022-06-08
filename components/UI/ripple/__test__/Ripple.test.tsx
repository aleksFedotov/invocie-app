import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Ripple from '../Ripple';
import { Button } from '../../button/ButtonStyles';

describe('Ripple component testing', () => {
  test('should render component', () => {
    render(
      <Button>
        <Ripple color="red" duration={2000} />
      </Button>
    );
    const container = screen.getByTestId(/ripple-container/i);
    expect(container).toBeInTheDocument();
  });
  test('ripple should not be rendered initialy', () => {
    render(
      <Button>
        <Ripple color="red" duration={2000} />
      </Button>
    );
    const ripple = screen.queryByTestId('ripple');
    expect(ripple).toBeNull();
  });
  test('render  1 ripple after one click', async () => {
    render(
      <Button>
        <Ripple color="red" duration={2000} />
      </Button>
    );
    const container = screen.getByTestId(/ripple-container/i);
    fireEvent.mouseDown(container);
    const ripple = await screen.findByTestId('ripple');
    expect(ripple).toBeInTheDocument();
  });

  test('render 3 ripple after three click', async () => {
    render(
      <Button>
        <Ripple color="red" duration={2000} />
      </Button>
    );
    const container = screen.getByTestId(/ripple-container/i);
    fireEvent.mouseDown(container);
    fireEvent.mouseDown(container);
    fireEvent.mouseDown(container);
    const ripples = await screen.findAllByTestId('ripple');
    expect(ripples).toHaveLength(3);
  });

  test('ripple should dissapear after time', async () => {
    render(
      <Button>
        <Ripple color="red" duration={4} />
      </Button>
    );
    const container = screen.getByTestId(/ripple-container/i);
    fireEvent.mouseDown(container);
    const ripple = await screen.findByTestId('ripple');
    expect(ripple).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('ripple')).not.toBeInTheDocument();
    });
  });
});
