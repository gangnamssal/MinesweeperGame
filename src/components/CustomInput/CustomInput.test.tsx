import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import CustomInput from '@components/CustomInput/CustomInput';

describe('CustomInput', () => {
  beforeEach(() => {
    render(<CustomInput />);
  });

  it('has three input', () => {
    const inputsEl = screen.getAllByRole('textbox');

    expect(inputsEl).toHaveLength(3);
  });
});
