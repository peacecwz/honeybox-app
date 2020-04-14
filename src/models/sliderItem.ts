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
