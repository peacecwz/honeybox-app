import {Source} from 'react-native-fast-image';
import {Submission} from './submission';

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
