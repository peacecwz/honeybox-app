import {Product} from '../../models/product';
import {SliderItem} from '../../models/sliderItem';
import BaseState from '../base-state';

const notImplemented = () => {
  console.error('Method not implemented');
};

export default class HomeState extends BaseState {
  sliderItems: Array<SliderItem> = [];
  products: Array<Product> = [];
  actions: {
    logOut: Function;
    openPage: Function;
  } = {
    logOut: notImplemented,
    openPage: notImplemented,
  };
}
