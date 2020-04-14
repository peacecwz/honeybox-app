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
