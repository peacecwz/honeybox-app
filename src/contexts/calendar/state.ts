const notImplemented = () => {
  console.error('Method not implemented');
};
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
export class Activity {
  date: string;
  details: Array<ActivityDetail>;

  constructor(date: any, activityDetails: any) {
    this.date = date;
    this.details =
      activityDetails && activityDetails.length && activityDetails.length > 0
        ? activityDetails.map(
            (activityDetail: any) => new ActivityDetail(activityDetail),
          )
        : [];
  }
}

export default class CalendarState {
  items: any = {};
  actions: {
    loadItems: Function;
  } = {
    loadItems: notImplemented,
  };
}
