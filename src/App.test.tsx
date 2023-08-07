/** @jsxImportSource @emotion/react */
import { render } from '@testing-library/react';
import { Mock, describe, it, vi } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';

import App from '@/App';
import { initialState as mine } from '@store/mineSlice';
import { initialState as time } from '@store/timeSlice';

vi.mock('react-redux');

describe('App', () => {
  const dispatch = vi.fn();
  (useDispatch as Mock).mockImplementation(() => dispatch);
  (useSelector as Mock).mockImplementation((selector) =>
    selector({
      mine,
      time,
    }),
  );

  it('is render', () => {
    render(<App />);
  });
});
