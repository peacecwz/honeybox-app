import {Challenge} from '../list/state';

const notImplemented = () => {
  console.error('Method not implemented');
};
export default class ChallengeDetailState {
  challenge: Challenge = new Challenge(null, {});
  canSubmitToChallenge: boolean = true;
  actions: {
    sendPhoto: Function;
    goBack: Function;
  } = {
    sendPhoto: notImplemented,
    goBack: notImplemented,
  };
}
