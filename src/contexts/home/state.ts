const notImplemented = () => {
  console.error('Method not implemented');
};

export default class HomeState {
  actions: {
    logOut: Function;
  } = {
    logOut: notImplemented,
  };
}
