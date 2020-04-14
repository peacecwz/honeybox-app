import BaseState from '../base-state';

const notImplemented = () => {
  console.error('Method not implemented');
};

export default class ActivitiesState extends BaseState {
  items: any = {};
  actions: {
    loadItems: Function;
  } = {
    loadItems: notImplemented,
  };
}
