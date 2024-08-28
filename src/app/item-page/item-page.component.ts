import { Component, inject } from '@angular/core';
import { GoodsService, Coments } from '../goods.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { BusketComponent } from '../busket/busket.component';
import { PreviewComponent } from '../preview/preview.component';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [RouterLink, RouterModule, BusketComponent, PreviewComponent, NgFor, NgClass, NgIf],
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.scss'
})

export class ItemPageComponent {
  goods = inject(GoodsService);
  activeRoutes = inject(ActivatedRoute);

  item: typeof this.goods.goodList[number];
  coments: Coments[] = [];

  isClosed = true;

  itemIndex = this.activeRoutes.snapshot.params["index"];

  constructor() {
    this.item = this.goods.goodList[this.itemIndex];
    this.coments = this.goods.goodList[this.itemIndex].coments;
  }

  CartBtn() {
    this.isClosed = false;
  }

  handleClosedEvent(closed: boolean) {
    this.isClosed = closed;
  }

  AddToCart() {
    const itemExists = this.goods.busket.some(item => item.name === this.item.name);
    if (itemExists) {
      const index = this.goods.busket.findIndex(item => item.name === this.item.name);
      this.goods.busket[index].amount += 1;
    } else {
      this.goods.busket.push(this.item);
      this.goods.saveToLocalStorage('busket', this.goods.busket);
    }
  }

  AddComents() {
    const firstInput = document.getElementById("NameOfCom") as HTMLInputElement;
    const secondInput = document.getElementById("TextOfCom") as HTMLInputElement;
    const errorDiv = document.getElementById("error") as HTMLElement;
    if (firstInput.value.trim() != "" && secondInput.value.trim() != "") {
      const objectList = {name: firstInput.value.trim(), text: secondInput.value.trim()};
      firstInput.value = "";
      secondInput.value = "";

      const forbiddenWords = ['кокос', 'банан', 'поганий'];
      let filteredComment = objectList.text;

      forbiddenWords.forEach(word => {
        const regex = new RegExp(word, 'gi');
        filteredComment = filteredComment.replace(regex, '*'.repeat(word.length));
      });

      filteredComment = filteredComment.replace(/@/g, '*');
      objectList.text = filteredComment;

      this.coments.push(objectList)
      this.goods.saveToLocalStorage('goodList', this.goods.goodList);


      errorDiv.style.display = "none";
    } else{
      errorDiv.style.display = "block";
    }
  }

  // ClearComents(){
  //   for (let index = 0; index < this.goods.goodList.length; index++) {
  //     this.goods.goodList[index].coments = [];
  //   }
  //   this.goods.saveToLocalStorage('goodList', this.goods.goodList);
  //   console.log(this.goods.goodList);
  // }

}