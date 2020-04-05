const notImplemented = () => {
  console.error('Method not implemented');
};

export default class ProfileState {
  isNotificationsEnabled: boolean = true;
  actions: {
    logOut: Function;
  } = {
    logOut: notImplemented,
  };
}
