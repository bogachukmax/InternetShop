import { NgIf } from '@angular/common';
import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import {GoodsService} from '../goods.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [RouterLink, RouterModule, NgIf],
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent{
  @Input() index = 0;
  @Input() img = "";
  @Input() name = "";
  @Input() price = "";
  @Input() description = "";
  @Input() coments = [];


  ButtonPlusUrl = `/cartPlus.svg`;
  ButtonCheckedUrl = `/cartRemove.svg`;
  ButtonTF: boolean = false;

  busketList = inject(GoodsService);

  ngOnInit() {
    this.checkButtonState();

    this.busketList.busketChange.subscribe(() => {
      this.checkButtonState();
    });
  }

  SmallerName(){
    return this.name.slice(0, 75);
  }
  
  PressButtonCart() {
    if (!this.ButtonTF) {
      this.AddToBusket();
    } else {
      this.DeleteToBusket();
    }
    this.ButtonTF = !this.ButtonTF;
  }

  AddToBusket() {
    const busketItem = this.busketList.goodList[this.index];
    const existingItem = this.busketList.busket.find(item =>
      item.name === busketItem.name &&
      item.price === busketItem.price &&
      item.description === busketItem.description
    );
  
    if (existingItem) {
      existingItem.amount++;
    } else {
      this.busketList.busket.push({ ...busketItem, amount: 1 });
    }
  
    this.busketList.saveToLocalStorage('busket', this.busketList.busket);
  }
  

  DeleteToBusket() {
    const itemIndex = this.busketList.busket.findIndex(
      (item) => item.name === this.busketList.goodList[this.index].name &&
      item.price === this.busketList.goodList[this.index].price &&
      item.description === this.busketList.goodList[this.index].description
    );
    if (itemIndex > -1) {
      this.busketList.busket.splice(itemIndex, 1);
      this.busketList.saveToLocalStorage('busket', this.busketList.busket);
    } else {
      console.log('Error with Busket');
    }
  }
  

  checkButtonState() {
    this.ButtonTF = this.busketList.busket.some(item =>
      item.name === this.busketList.goodList[this.index].name &&
      item.price === this.busketList.goodList[this.index].price &&
      item.description === this.busketList.goodList[this.index].description
    );
  }

  constructor() {}
}
