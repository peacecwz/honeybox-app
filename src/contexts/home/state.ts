const notImplemented = () => {
  console.error('Method not implemented');
};

export class SliderItem {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;

  constructor(key: any, sliderItem: any) {
    this.id = key;
    this.title = sliderItem.title;
    this.description = sliderItem.description;
    this.image = sliderItem.image;
    this.url = sliderItem.url;
  }
}

export class Product {
  id: string;
  title: string;
  category: string;
  price: string;
  amount: string;
  image: string;
  url: string;

  constructor(key: any, product: any) {
    this.id = key;
    this.title = product.title;
    this.category = product.category;
    this.price = product.price;
    this.amount = product.amount;
    this.image = product.image;
    this.url = product.url;
  }
}

export default class HomeState {
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
