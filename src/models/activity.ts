import {ActivityDetail} from "./activityDetail";

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
