/** @jsxImportSource @emotion/react */
import { render } from '@testing-library/react';
import { Mock, describe, it, vi } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';

import App from '@/App';
import mine from '@fixtures/mine';
import time from '@fixtures/time';

vi.mock('react-redux');

describe('App', () => {
  const dispatch = vi.fn();
  (useDispatch as Mock).mockImplementation(() => dispatch);
  (useSelector as Mock).mockImplementation((selector) =>
    selector({
      mine: mine,
      time: time,
    }),
  );

  it('is render', () => {
    render(<App />);
  });
});
