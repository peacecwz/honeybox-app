import {light, dark} from '@eva-design/eva';
const themes: any = {
  light: light,
  dark: dark,
};
export function getTheme(key: string) {
  const theme = themes[key];
  return theme ? theme : light;
}
