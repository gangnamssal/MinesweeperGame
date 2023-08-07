/** @jsxImportSource @emotion/react */
import { css, Global, ThemeProvider } from '@emotion/react';

import theme from '@style/theme';
import Timer from '@components/Timer';
import Minesweeper from '@components/Minesweeper';
import DifficultySelect from '@/components/DifficultySelect/DifficultySelect';

function App() {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <Global styles={globalCss} />
        <section>
          <article css={globalStyle.menus}>
            {/* 난이도를 조정하는 select */}
            <DifficultySelect />

            {/* 타이머 */}
            <Timer />
          </article>

          <article>
            {/* 지뢰게임이 시작되는 컴포넌트 */}
            <Minesweeper />
          </article>
        </section>
      </ThemeProvider>
    </main>
  );
}

export const globalCss = {
  body: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1280px',
    height: '100vh',
    margin: '0 auto',
    padding: '0',
    boxSizing: 'border-box',
    backgroundColor: 'black',
    color: 'white',
  }),
};

const globalStyle = {
  menus: () =>
    css({
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '3%',
    }),
};

export default App;
