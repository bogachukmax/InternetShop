import { EventEmitter, Injectable } from '@angular/core';

export type Item = {
  img: string,
  name: string,
  price: string,
  description: string,
  amount: number;
  coments: Coments[];
}

export type Coments = {
  name: string,
  text: string,
}

@Injectable({
  providedIn: 'root'
})

export class GoodsService {
  goodList: Item[] = [];
  busket: Item[] = [];
  busketChange = new EventEmitter<Item[]>();


  constructor() {
    this.goodList = this.loadFromLocalStorage('goodList') || [  
      {
        img: "https://content1.rozetka.com.ua/goods/images/big/365944650.jpg",
        name: "Ноутбук HP Victus Gaming Laptop 15-fa0020ua (8F2S4EA) Mica Silver / Intel® Core™ i5-12450H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050, 4 ГБ / Підсвітка клавіатури ",
        price: "22999₴",
        description: "Super good Laptop",
        amount: 1,
        coments: [],
      },
      {
        img: "https://content1.rozetka.com.ua/goods/images/big_tile/443297147.jpg",
        name: " Зарядна станція Bluetti AC2A / 300 Вт / 204.8 Вт⋅ч / LiFePO4 ",
        price: "10999₴",
        description: "Super good Laptop",
        amount: 1,
        coments: [],
      },
      {
        img: "https://content2.rozetka.com.ua/goods/images/big_tile/419409093.jpg",
        name: " Мобільний телефон Samsung Galaxy A15 8/256GB Blue-Black (SM-A155FZKIEUC) ",
        price: "8299₴",
        description: "Super good Laptop",
        amount: 1,
        coments: [],
      },
      {
        img: "https://content.rozetka.com.ua/goods/images/big_tile/286137644.jpg",
        name: "Акумуляторний пилосос Rowenta VERSATILE X-FORCE 15.60 RH99F1WO ",
        price: "125₴",
        description: "Super good Laptop",
        amount: 1,
        coments: [],
      },
      {
        img: "https://content1.rozetka.com.ua/goods/images/big_tile/333914601.jpg",
        name: "Кавоварка крапельна Bravilor Bonamat Novo ",
        price: "15127₴",
        description: "Super good Laptop",
        amount: 1,
        coments: [],
      },
      {
        img: "https://content2.rozetka.com.ua/goods/images/big_tile/359919019.jpg",
        name: "Акумулятор Extreme 6CT-60 А/год Аз (EXT601)",
        price: "2350₴",
        description: "Super good Laptop",
        amount: 1,
        coments: [],
      },
      {
        img: "https://content.rozetka.com.ua/goods/images/big/400169158.jpg",
        name: "Ноутбук Lenovo IdeaPad 1 15AMN7 (82VG00HHRA) Cloud Grey / 15.6&quot; IPS Full HD / AMD Ryzen 3 7320U / RAM 16 ГБ / SSD 512 ГБ",
        price: "15999₴",
        description: "Super good Laptop",
        amount: 1,
        coments: [],
      },
      {
        img: "https://content2.rozetka.com.ua/goods/images/big/441270474.jpg",
        name: "3D-принтер Creality K1C (CR-K1C)",
        price: "28999₴",
        description: "Super good Laptop",
        amount: 1,
        coments: [],
      },
      {
        img: "https://content2.rozetka.com.ua/goods/images/big/388684589.jpg",
        name: "Шредер DA TSM410A-CD Офісний 4x12 (1410401011006)",
        price: "3505₴",
        description: "Super good Laptop",
        amount: 1,
        coments: [],
      },
      {
        img: "https://content1.rozetka.com.ua/goods/images/big/101471043.jpg",
        name: "Акустична система Edifier R1080BT Black",
        price: "3499₴",
        description: "Super good Laptop",
        amount: 1,
        coments: [],
      }
    ]
    this.busket = this.loadFromLocalStorage('busket') || [];
  }

  loadFromLocalStorage(key: string): any[] | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  saveToLocalStorage(key: string, data: any[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeFromBusket(index: number) {
    this.busket.splice(index, 1);
    this.saveToLocalStorage('busket', this.busket);
    this.busketChange.emit(this.busket); 
  }

  removeAllFromBusket() {
    this.busket = [];
    this.saveToLocalStorage('busket', this.busket);
    this.busketChange.emit(this.busket);
  }

  addComent(itemIndex: number, coment: Coments) {
    this.goodList[itemIndex].coments.push(coment);
    this.saveToLocalStorage('goodList', this.goodList);
  }

  removeProduct(index: number) {
    this.goodList.splice(index, 1);
    this.saveToLocalStorage('goodList', this.goodList);
  }
}
