import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { GoodsService, Item } from '../goods.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [RouterLink,RouterModule,NgIf,PreviewComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})

export class PreviewComponent {
  @Input() index = 0;
  @Input() img = "";
  @Input() name = "";
  @Input() price = "";
  @Input() description = "";

  ButtonPlusUrl = `/cartPlus.png`;
  ButtonCheckedUrl = `/cartChecked.png`;
  ButtonTF = false;

  busketList = inject(GoodsService);

  SmallerName(){
    return this.name.slice(0, 75);
  }
  
  PressButtonCart(){
    
    if (this.ButtonTF == false) {
      this.AddToBusket();
      this.ButtonTF = true
    } else{
      this.DeleteToBusket();
      this.ButtonTF = false
    }
  }

  AddToBusket(){
    let busketItem = this.busketList.goodList[this.index];
    this.busketList.busket.push(busketItem)
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

  constructor(){}
}
