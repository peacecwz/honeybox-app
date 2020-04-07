const notImplemented = () => {
  console.error('Method not implemented');
};

export default class ProfileState {
  isNotificationsEnabled: boolean = true;
  actions: {
    logOut: Function;
    goToBlog: Function;
    goToAboutUs: Function;
    goToContactUs: Function;
    goToPrivacy: Function;
    goToSocial: Function;
  } = {
    logOut: notImplemented,
    goToAboutUs: notImplemented,
    goToBlog: notImplemented,
    goToContactUs: notImplemented,
    goToPrivacy: notImplemented,
    goToSocial: notImplemented,
  };
}
