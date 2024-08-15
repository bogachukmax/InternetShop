import { NgIf } from '@angular/common';
import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { GoodsService, Item } from '../goods.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [RouterLink, RouterModule, NgIf],
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {
  @Input() index = 0;
  @Input() img = "";
  @Input() name = "";
  @Input() price = "";
  @Input() description = "";

  ButtonPlusUrl = `/cartPlus.png`;
  ButtonCheckedUrl = `/cartChecked.png`;
  ButtonTF: boolean = false;

  busketList = inject(GoodsService);
  
  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.busketList.busketChanged.subscribe(() => {
      this.checkButtonState();
    });
    this.checkButtonState();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  AddToBusket(){
    let busketItem = this.busketList.goodList[this.index];
    this.busketList.busket.push(busketItem);
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
    this.ButtonTF = this.busketList.busket.some(item => item === this.busketList.goodList[this.index]);
  }

  constructor() {}
}
