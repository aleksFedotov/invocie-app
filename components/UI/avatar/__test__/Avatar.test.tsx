import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import Avatar from '../Avatar';

window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
};

describe('Avatar component testing', () => {
  test('should render component', () => {
    render(<Avatar image="/test_img" onClick={() => jest.fn} />);
    const avatarImg = screen.getByAltText('avatar');
    expect(avatarImg).toBeInTheDocument();
  });
  test('should have right size', () => {
    render(<Avatar image="/test_img" onClick={() => jest.fn} />);
    const avatarImg = screen.getByRole('img');

    expect(avatarImg).toHaveAttribute('data-size', '40');
  });

  test('should have size 32 after resizing to 650', () => {
    const { rerender } = render(
      <Avatar image="/test_img" onClick={() => jest.fn} />
    );
    act(() => {
      window.resizeTo(500, 500);
    });

    rerender(<Avatar image="/test_img" onClick={() => jest.fn} />);
    const avatarImg = screen.getByRole('img');
    expect(avatarImg).toHaveAttribute('data-size', '32');
  });
});
