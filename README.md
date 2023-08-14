 

  ## # 프로젝트 실행

  ```
  npm install
  npm run dev
  ```

  

  ## # 프로젝트 환경

  **빌드 도구** : Vite

  **언어** : TypeScript

  **상태 관리** : Redux-toolkit

  

  ## # Commit 컨벤션

  ```
  feat: 기능 추가, 삭제, 변경 (코드 수정)
  fix: 버그 수정
  type: 코드 형식 변경
  design: UI 변경
  refactor: 코드 리팩토링
  docs: 코드 외 문서의 추가, 삭제, 변경
  test: 테스트 코드 추가, 삭제, 변경
  chore: 빌드 업무 수정, 패키지 매니저 수정
  ```

  

  ## # 폴더 구조

  ```
  📦src
   ┣ 📂assets
   ┃ ┗ 📜react.svg
   ┣ 📂components
   ┃ ┣ 📂CustomInput
   ┃ ┃ ┣ 📜CustomInput.test.tsx
   ┃ ┃ ┗ 📜CustomInput.tsx
   ┃ ┣ 📂DifficultySelect
   ┃ ┃ ┣ 📜DifficultySelect.test.tsx
   ┃ ┃ ┗ 📜DifficultySelect.tsx
   ┃ ┣ 📂Minesweeper
   ┃ ┃ ┣ 📜Minesweeper.test.tsx
   ┃ ┃ ┗ 📜Minesweeper.tsx
   ┃ ┗ 📂Timer
   ┃ ┃ ┣ 📜Timer.test.tsx
   ┃ ┃ ┗ 📜Timer.tsx
   ┣ 📂helper
   ┃ ┣ 📜checkDone.test.ts
   ┃ ┣ 📜checkDone.ts
   ┃ ┣ 📜deepCopy.test.ts
   ┃ ┗ 📜deepCopy.ts
   ┣ 📂hooks
   ┃ ┣ 📜useCheckMine.test.ts
   ┃ ┣ 📜useCheckMine.ts
   ┃ ┣ 📜useSetMine.test.ts
   ┃ ┗ 📜useSetMine.ts
   ┣ 📂store
   ┃ ┣ 📂mineSlice
   ┃ ┃ ┣ 📜mineSlice.test.ts
   ┃ ┃ ┗ 📜mineSlice.ts
   ┃ ┣ 📂timeSlice
   ┃ ┃ ┣ 📜timeSlice.test.ts
   ┃ ┃ ┗ 📜timeSlice.ts
   ┃ ┗ 📜store.ts
   ┣ 📂style
   ┃ ┗ 📜theme.ts
   ┣ 📜App.test.tsx
   ┣ 📜App.tsx
   ┣ 📜main.tsx
   ┗ 📜vite-env.d.ts
  ```

  

  ## # 구현Scope

  - 첫 번째 빈칸을 열었을 경우 지뢰가 터지지 않는다.
    - 첫 번째 칸을 제외한 곳에서 지뢰를 생성

  - 마우스 우측 클릭 시 flag 생성 기능
    - 지뢰가 예상되는 영역에 flag 표식을 남길 수 있습니다.

  - 타이머
    - 게임 시작 시 5분의 시간이 주어집니다.

  - 난이도 변경
    - 난이도는 Beginner (8X8), Intermediate (16X16), Expert (32X16)로 변경이 가능하고 custom으로 칸을 조절할 수 있습니다.




  ## # 배포 링크

  https://minesweeper-game-seven.vercel.app/
