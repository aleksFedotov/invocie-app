import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ViewButtons from '../ViewButtons';

describe('InvoiceViewHeaderStyle componetn testing', () => {
  test('should render 3 buttons', () => {
    render(<ViewButtons isMobile={false} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  test('should render edit btn', () => {
    render(<ViewButtons isMobile={false} />);
    const editBtn = screen.getByRole('button', { name: /edit/i });
    expect(editBtn).toHaveClass('edit_btn');
  });

  test('should render delete btn', () => {
    render(<ViewButtons isMobile={false} />);
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    expect(deleteBtn).toHaveClass('delete_btn');
  });

  test('should render main btn', () => {
    render(<ViewButtons isMobile={false} />);
    const mainBtn = screen.getByRole('button', { name: /Mark as Read/i });
    expect(mainBtn).toHaveClass('main_btn');
  });
});
