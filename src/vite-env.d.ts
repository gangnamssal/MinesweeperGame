/// <reference types="vite/client" />

import '@emotion/react';
declare module '@emotion/react' {
  export interface Theme {
    color: {
      lightGray: string;
      gray: string;
    };
    menuSize: {
      width: number;
      height: number;
    };
  }
}
