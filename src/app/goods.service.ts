import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GoodsService {
  goodList = [
    {
      img: "https://content1.rozetka.com.ua/goods/images/big/365944650.jpg",
      name: "Ноутбук HP Victus Gaming Laptop 15-fa0020ua (8F2S4EA) Mica Silver / Intel® Core™ i5-12450H / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 3050, 4 ГБ / Підсвітка клавіатури ",
      price: "22999₴",
      description: "Super good Laptop",
    },
    {
      img: "https://content1.rozetka.com.ua/goods/images/big_tile/443297147.jpg",
      name: " Зарядна станція Bluetti AC2A / 300 Вт / 204.8 Вт⋅ч / LiFePO4 ",
      price: "10999₴",
      description: "Super good Laptop",
    },
    {
      img: "https://content2.rozetka.com.ua/goods/images/big_tile/419409093.jpg",
      name: " Мобільний телефон Samsung Galaxy A15 8/256GB Blue-Black (SM-A155FZKIEUC) ",
      price: "8299₴",
      description: "Super good Laptop",
    },
    {
      img: "https://content.rozetka.com.ua/goods/images/big_tile/286137644.jpg",
      name: "Акумуляторний пилосос Rowenta VERSATILE X-FORCE 15.60 RH99F1WO ",
      price: "125₴",
      description: "Super good Laptop",
    },
    {
      img: "https://content1.rozetka.com.ua/goods/images/big_tile/333914601.jpg",
      name: "Кавоварка крапельна Bravilor Bonamat Novo ",
      price: "15127₴",
      description: "Super good Laptop",
    },
    {
      img: "https://content2.rozetka.com.ua/goods/images/big_tile/359919019.jpg",
      name: "Акумулятор Extreme 6CT-60 А/год Аз (EXT601)",
      price: "2350₴",
      description: "Super good Laptop",
    },
    {
      img: "https://content1.rozetka.com.ua/goods/images/big/365944650.jpg",
      name: "Laptop",
      price: "125₴",
      description: "Super good Laptop",
    },
  ]

  constructor() { }
}
