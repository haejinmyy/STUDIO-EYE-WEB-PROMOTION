import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      symbol: string;
      background: string;
      black: {
        bold: string;
        light: string;
        pale: string;
      };
      white: {
        bold: string;
        light: string;
      };
      yellow: {
        bold: string;
        light: string;
      };
    };
    font: {
      thin: string;
      light: string;
      regular: string;
      medium: string;
      semiBold: string;
      bold: string;
    };
  }
}
