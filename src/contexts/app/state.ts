export default class AppState {
  isLogged: boolean;
  isLoading: boolean;
  theme: string;

  constructor() {
    this.isLogged = false;
    this.isLoading = true;
    this.theme = 'light';
  }
}
