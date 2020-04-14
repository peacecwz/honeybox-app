import * as React from 'react';
import BaseContainer from '../../base-container';
import {AccountRoutePath} from '../../../routes/route.path';
import HomeScreen from '../../../screens/tab/home/home.screen';
import HomeContext from '../../../contexts/home/context';
import HomeState from '../../../contexts/home/state';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import {Linking} from 'react-native';
import {Challenge} from "../../../models/challenge";
import {Product} from "../../../models/product";
import {SliderItem} from "../../../models/sliderItem";
export interface Props {}

export default class HomeContainer extends BaseContainer<Props, HomeState> {
  constructor(props: any) {
    super(props);
    const state = new HomeState();
    state.actions.logOut = this.logOut.bind(this);
    state.actions.openPage = this.openPage.bind(this);
    this.state = state;
  }

  async openPage(url: string) {
    if (!url || url === '') {
      return;
    }
    await Linking.openURL(url);
  }

  async getSliderItems(): Promise<Array<SliderItem>> {
    const sliderItemsRequest = await database()
      .ref('/sliderItems')
      .once('value');

    const result = sliderItemsRequest.val();
    const sliderItems: Array<SliderItem> = [];
    Object.keys(result).forEach(key => {
      const sliderItem = result[key];
      sliderItems.push(new SliderItem(key, sliderItem));
    });

    return sliderItems;
  }

  async getProducts(): Promise<Array<Product>> {
    const productsRequest = await database()
      .ref('/products')
      .once('value');

    const result = productsRequest.val();
    const products: Array<Product> = [];
    Object.keys(result).forEach(key => {
      const product = result[key];
      products.push(new Product(key, product));
    });

    return products;
  }

  async componentDidMount() {
    const sliderItems = await this.getSliderItems();
    const products = await this.getProducts();

    this.setState({
      sliderItems: sliderItems,
      products: products,
    });
  }

  async logOut() {
    if (auth().currentUser) {
      await auth().signOut();
    }
    await AsyncStorage.removeItem('isLoggedUser');
    this.push(AccountRoutePath);
  }

  render() {
    return (
      <HomeContext.Provider value={this.state}>
        <HomeScreen />
      </HomeContext.Provider>
    );
  }
}
