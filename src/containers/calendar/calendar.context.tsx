import * as React from 'react';
import BaseContainer from '../base-container';
import CalendarState, {Activity} from '../../contexts/calendar/state';
import CalendarContext from '../../contexts/calendar/context';
import CalendarScreen from '../../screens/calendar/calender.screen';
import database from '@react-native-firebase/database';
import {Challenge} from '../../contexts/challenges/list/state';
import {addDayToDate, dateToString, getDates} from '../../utils/date-utils';
export interface Props {}
export default class CalendarContainer extends BaseContainer<
  Props,
  CalendarState
> {
  constructor(props: any) {
    super(props);
    const state = new CalendarState();
    state.actions.loadItems = this.loadItems.bind(this);
    this.state = state;
  }

  async initData() {
    const activitiesRequest = await database().ref(
      `/users/${this.getUserId()}/activities`,
    );

    const data = [
      new Activity('2020-04-06', [
        {
          content: 'deneme 1',
        },
        {
          content: 'deneme 2',
        },
      ]),
    ];

    for (const activity of data) {
      const pushRef = activitiesRequest.push();

      await pushRef.set(activity);
    }
  }

  async componentDidMount() {
    const activitiesRequest = await database()
      .ref(`/users/${this.getUserId()}/activities`)
      .once('value');
    const items: any = this.state.items;
    const result = activitiesRequest.val();

    if (result) {
      Object.keys(result).forEach(activityId => {
        const activity = result[activityId];
        items[activity.date] = activity.details;
      });
    }

    this.setState({
      items: items,
    });
  }

  loadItems(date: any) {
    const currentDate = new Date(date.dateString);
    const lastMonth = addDayToDate(currentDate, -30);
    const nextMonth = addDayToDate(currentDate, 30);
    const dates = getDates(lastMonth, nextMonth);
    const items = this.state.items;
    for (const d of dates) {
      if (!items[d]) {
        items[d] = [];
      }
    }
    this.setState({
      items: items,
    });
  }

  render() {
    return (
      <CalendarContext.Provider value={this.state}>
        <CalendarScreen />
      </CalendarContext.Provider>
    );
  }
}
