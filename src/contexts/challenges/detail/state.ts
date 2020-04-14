import BaseState from '../../base-state';
import {Challenge} from "../../../models/challenge";

const notImplemented = () => {
  console.error('Method not implemented');
};
export default class ChallengeDetailState extends BaseState {
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
