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


  ButtonPlusUrl = `/cartPlus.png`;
  ButtonCheckedUrl = `/cartChecked.png`;
  ButtonTF: boolean = false;

  busketList = inject(GoodsService);

  ngOnInit() {
    this.checkButtonState();
  }

  SmallerName(){
    return this.name.slice(0, 75);
  }
  
  PressButtonCart(){
    if (!this.ButtonTF) {
      this.AddToBusket();
      this.ButtonTF = true;
    } else {
      this.DeleteToBusket();
      this.ButtonTF = false;
    }
  }

  AddToBusket() {
    const itemExists = this.busketList.busket.some(item => 
      item.name === this.busketList.goodList[this.index].name &&
      item.price === this.busketList.goodList[this.index].price &&
      item.description === this.busketList.goodList[this.index].description
    );
  
    if (!itemExists) { 
      let busketItem = this.busketList.goodList[this.index];
      this.busketList.busket.push(busketItem);
      this.busketList.saveToLocalStorage('busket', this.busketList.busket);
    }
  }

  DeleteToBusket(){
    const itemIndex = this.busketList.busket.findIndex(
      (item) => item === this.busketList.goodList[this.index]
    );
    if (itemIndex > -1) {
      this.busketList.busket.splice(itemIndex, 1);
    } else {
      console.log('Error with Busket');
    }
  }

  checkButtonState() {
    if (this.busketList.busket.some(item => item === this.busketList.goodList[this.index])) {
      this.ButtonTF = true;
    } else{
      this.ButtonTF = false;
    }
  }

  constructor() {}
}
