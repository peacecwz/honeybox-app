import {Challenge} from '../../../models/challenge';
import BaseState from '../../base-state';

const notImplemented = () => {
  console.error('Method not implemented');
};

export default class ChallengesState extends BaseState {
  challenges: Array<Challenge> = [];
  actions: {
    goToChallengeDetail: Function;
  } = {
    goToChallengeDetail: notImplemented,
  };
}
