/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from 'react';
import { css, Theme, useTheme } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@store/store';
import { setMinute, setSecond } from '@store/timeSlice/timeSlice';

export default function Timer() {
  const time = useRef<number>(0);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isStart } = useSelector((state: RootState) => state.mine);
  const { minute, second } = useSelector((state: RootState) => state.time);

  useEffect(() => {
    // 만약 게임을 시작했으면 타이머 작동
    if (isStart) {
      time.current = window.setTimeout(() => {
        if (minute > 0 && second === 0) {
          dispatch(setMinute(minute - 1));
          dispatch(setSecond(59));
        } else if (minute === 0 && second === 0) {
          clearTimeout(time.current);
        } else dispatch(setSecond(second - 1));
      }, 1000);
    }
    if (!isStart) {
      // 게임이 종료되면 타이머 초기화
      dispatch(setMinute(0));
      dispatch(setSecond(0));
    }
  }, [minute, second, dispatch]);

  return <div css={timerCss.container(theme)}>{`${minute} : ${second < 10 ? `0${second}` : second}`}</div>;
}

const timerCss = {
  container: (theme: Theme) =>
    css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: `${theme.menuSize.width}%`,
      height: `${theme.menuSize.height}vh`,
      backgroundColor: 'white',
      color: 'red',
      fontWeight: '900',
    }),
};
