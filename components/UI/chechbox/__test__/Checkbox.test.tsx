import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import Checkbox from '../Checkbox';
import '@testing-library/jest-dom';

const mockCheckBoxComponent = (label: string) => {
  return (
    <Provider store={store}>
      <Checkbox label={label} />
    </Provider>
  );
};

describe('Checkbox componet testing', () => {
  test('should render component', () => {
    render(mockCheckBoxComponent('Draft'));
    const checkbox = screen.getByLabelText(/draft/i);
    expect(checkbox).toBeInTheDocument();
  });

  test('should not be checked before clicking', () => {
    render(mockCheckBoxComponent('Draft'));
    const checkbox = screen.getByLabelText(/draft/i);
    expect(checkbox).not.toBeChecked();
  });

  test('should be checked after clicking', () => {
    render(mockCheckBoxComponent('Draft'));
    const checkbox = screen.getByLabelText(/draft/i);
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
