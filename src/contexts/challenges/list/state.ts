import {ImageSourcePropType} from 'react-native';
import {Source} from 'react-native-fast-image';

const notImplemented = () => {
  console.error('Method not implemented');
};

export class Submission {
  id: string;
  status: string;
  isComplete: boolean;
  mediaUrl: string;
  constructor(id: any, submission: any) {
    this.id = id;
    this.isComplete = submission.isComplete;
    this.status = submission.status;
    this.mediaUrl = submission.mediaUrl;
  }
}

export class Challenge {
  id: string;
  title: string;
  description: string;
  content: string;
  image: Source | string;
  date: string;
  submissions: Array<Submission>;
  constructor(id: any, challenge: any) {
    this.id = id;
    this.title = challenge.title;
    this.description = challenge.description;
    this.content = challenge.content;
    this.image = challenge.image;
    this.date = challenge.date;
    this.submissions = challenge.submissions
      ? Object.keys(challenge.submissions).map(
          submissionKey =>
            new Submission(submissionKey, challenge.submissions[submissionKey]),
        )
      : [];
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
