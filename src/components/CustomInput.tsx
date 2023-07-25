/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function CustomInput() {
  return (
    <div css={customInputCss.container}>
      <div>
        <input type='text' css={customInputCss.input} />
        <input type='text' css={customInputCss.input} />
      </div>
      <input type='text' css={customInputCss.input} />
    </div>
  );
}

const customInputCss = {
  container: () =>
    css({
      width: '5%',
      margin: '0 5%',
    }),

  input: () =>
    css({
      width: '100%',
    }),
};
