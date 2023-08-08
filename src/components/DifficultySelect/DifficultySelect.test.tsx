import { useDispatch } from 'react-redux';
import { Mock, describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';

import theme from '@style/theme';
import { ThemeProvider } from '@emotion/react';
import DifficultySelect from '@components/DifficultySelect/DifficultySelect';

vi.mock('react-redux');

const dispatch = vi.fn();
const context = describe;
const user = userEvent.setup();

(useDispatch as Mock).mockImplementation(() => dispatch);

describe('DifficultySelect', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <DifficultySelect />
      </ThemeProvider>,
    );
  });

  it('has difficulty selectBox, it has 4 difficulty', () => {
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);

    const level0 = options[0].textContent;
    expect(level0).toBe('Beginner');

    const level1 = options[1].textContent;
    expect(level1).toBe('Intermediate');

    const level2 = options[2].textContent;
    expect(level2).toBe('Expert');

    const level3 = options[3].textContent;
    expect(level3).toBe('Custom');
  });

  it('has change option called function', () => {
    const selectEl = screen.getByRole('combobox');
    const optionsEl: HTMLOptionElement[] = screen.getAllByRole('option');

    fireEvent.change(selectEl, { target: { value: 2 } });

    expect(dispatch).toBeCalled();

    optionsEl.forEach((option: HTMLOptionElement, index: number) => {
      if (index === 2) expect(option.selected).toBeTruthy();
      else expect(option.selected).toBeFalsy();
    });
  });

  it('has modal, click custom option to open modal', () => {
    const modalEl = screen.getByRole('dialog', { hidden: true });

    expect(modalEl).toBeInTheDocument();
  });

  it('has modal, has two input', () => {
    const modalRowInput = screen.getByPlaceholderText('가로');
    const modalColInput = screen.getByPlaceholderText('세로');

    expect(modalRowInput).toBeInTheDocument();
    expect(modalColInput).toBeInTheDocument();
  });

  it('has modal, has two button', () => {
    const cancelButton = screen.getByRole('button', { name: '취소', hidden: true });
    const applyButton = screen.getByRole('button', { name: '적용', hidden: true });

    expect(cancelButton).toBeInTheDocument();
    expect(applyButton).toBeInTheDocument();
  });

  context('when modal apply button click', () => {
    it('is call dispatch', () => {
      const applyButton = screen.getByRole('button', { name: '적용', hidden: true });

      user.click(applyButton);

      expect(dispatch).toBeCalled();
    });
  });
});
