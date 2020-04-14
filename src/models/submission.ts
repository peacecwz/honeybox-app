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
