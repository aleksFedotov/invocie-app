import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar from '../Avatar';

describe('Avatar component testing', () => {
  test('should render component', () => {
    render(<Avatar image="/test_img" />);
    const avatarImg = screen.getByAltText('avatar');
    expect(avatarImg).toBeInTheDocument();
  });
});
