export class ActivityDetail {
  content: string;
  emotionStatus: string;
  color: string;
  type: string;

  constructor(detail: any) {
    this.color = detail.color;
    this.content = detail.content;
    this.emotionStatus = detail.emotionStatus;
    this.type = detail.type;
  }
}
