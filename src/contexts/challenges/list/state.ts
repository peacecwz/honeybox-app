import {ImageSourcePropType} from 'react-native';

const notImplemented = () => {
  console.error('Method not implemented');
};
export class Challenge {
  id: string;
  title: string;
  description: string;
  content: string;
  image: ImageSourcePropType;
  date: string;
  constructor(id: any, challenge: any) {
    this.id = id;
    this.title = challenge.title;
    this.description = challenge.description;
    this.content = challenge.content;
    this.image = challenge.image;
    this.date = challenge.date;
  }
}
export default class ChallengesState {
  challenges: Array<Challenge> = [];
  actions: {
    goToChallengeDetail: Function;
  } = {
    goToChallengeDetail: notImplemented,
  };
}
