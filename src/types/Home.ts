export interface Home {
  slider: Slider;
  categories: Categories;
}

export interface Slider {
  items: Item[];
}

export interface Item {
  name: string;
  img_url: string;
}

export interface Categories {
  items: Item2[];
}

export interface Item2 {
  name: string;
  img_url: string;
}
