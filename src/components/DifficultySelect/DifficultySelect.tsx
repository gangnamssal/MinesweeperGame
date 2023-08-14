/** @jsxImportSource @emotion/react */
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { css, Theme, useTheme } from '@emotion/react';

import { changeDifficulty, CustomMap, setCustomMap } from '@store/mineSlice/mineSlice';

const difficultyObj: DifficultyObj = {
  '0': { row: 8, col: 8 },
  '1': { row: 16, col: 16 },
  '2': { row: 32, col: 16 },
};

export default function DifficultySelect() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [custom, setCustom] = useState<CustomMap>({ col: 0, row: 0 });

  const changeDifficultyValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === '3' && dialogRef.current) dialogRef?.current.showModal();
    else dispatch(changeDifficulty(difficultyObj[value]));
  };

  const customRowInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    setCustom((prev) => ({ ...prev, row: inputValue }));
  };

  const customColInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    setCustom((prev) => ({ ...prev, col: inputValue }));
  };

  const applyCustomInput = () => {
    dispatch(setCustomMap(custom));
    if (dialogRef.current) dialogRef.current.close();
  };

  return (
    <div css={difficultySelectCss.container(theme)}>
      <select onChange={changeDifficultyValue} css={difficultySelectCss.select}>
        <option value='0'>Beginner</option>
        <option value='1'>Intermediate</option>
        <option value='2'>Expert</option>
        <option value='3'>Custom</option>
      </select>

      <div onClick={() => dialogRef.current?.close()}>
        <dialog ref={dialogRef}>
          <div onClick={(e) => e.stopPropagation()} css={difficultySelectCss.dialog}>
            <input type='number' placeholder='가로' onChange={customRowInput} css={difficultySelectCss.input} />
            <input type='number' placeholder='세로' onChange={customColInput} css={difficultySelectCss.input} />

            <div css={difficultySelectCss.modalButton}>
              <button onClick={() => dialogRef.current?.close()} css={difficultySelectCss.cancelBtn}>
                취소
              </button>
              <button onClick={applyCustomInput} css={difficultySelectCss.applyBtn}>
                적용
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

interface DifficultyObj {
  [k: string]: { row: number; col: number };
}

const difficultySelectCss = {
  container: (theme: Theme) =>
    css({
      width: `${theme.menuSize.width}%`,
      height: `${theme.menuSize.height}vh`,
    }),

  select: () =>
    css({
      width: '100%',
      height: '100%',
    }),

  dialog: () =>
    css({
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }),

  input: () =>
    css({
      borderRadius: '8px',
    }),

  modalButton: () =>
    css({
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    }),

  cancelBtn: () =>
    css({
      border: '0',
      backgroundColor: 'red',
      color: 'white',
      borderRadius: '8px',
      width: '50%',
      cursor: 'pointer',
    }),

  applyBtn: () =>
    css({
      border: '0',
      backgroundColor: 'green',
      color: 'white',
      borderRadius: '8px',
      width: '50%',
      cursor: 'pointer',
    }),
};
