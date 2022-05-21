import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePicker from '../DatePicker';

describe('', () => {
  test('', () => {
    render(
      <DatePicker
        label="Date"
        value={''}
        isEdit={false}
        id={'Date'}
        onChange={() => {}}
      />
    );
    screen.debug();
  });
});
