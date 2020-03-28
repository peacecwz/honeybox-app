export default class AppState {
  isLogged: boolean;
  isLoading: boolean;

  constructor() {
    this.isLogged = false;
    this.isLoading = true;
  }
}
