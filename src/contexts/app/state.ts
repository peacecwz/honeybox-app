import BaseState from '../base-state';

export default class AppState extends BaseState {
  isLogged: boolean;
  theme: string;

  constructor() {
    super();
    this.isLogged = false;
    this.theme = 'light';
  }
}
