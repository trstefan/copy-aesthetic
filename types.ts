export interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  border: string;
}

export interface ThemeStyles {
  fontFamily: string;
  borderRadius: string;
  boxShadow: string;
  borderWidth: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  styles: ThemeStyles;
  promptShort: string;
  promptLong: string;
}

export enum AppView {
  LANDING = 'LANDING',
  PREVIEW = 'PREVIEW'
}
