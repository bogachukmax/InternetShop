import { Component, inject } from '@angular/core';
import { GoodsService } from '../goods.service';
import { NgFor, NgIf, NgStyle, NgClass } from '@angular/common';
import { PreviewComponent } from "../preview/preview.component";
import { RouterLink, RouterModule } from '@angular/router';
import { BusketComponent } from '../busket/busket.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, PreviewComponent, BusketComponent, RouterLink, RouterModule, NgClass],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  goods = inject(GoodsService);

  findInfoValue = ``;
  
  GettingValue(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.findInfoValue = inputElement.value;
  }
  
  filteredGoods = this.goods.goodList;

  Finding(){
    const lowerSearchValue = this.findInfoValue.toLowerCase();

    this.filteredGoods = this.goods.goodList.filter(item =>
      item.name.toLowerCase().includes(lowerSearchValue)
    );
  }

  isClosed = true;

  CartBtn() {
    this.isClosed = false;
  }

  handleClosedEvent(closed: boolean) {
    this.isClosed = closed;
  }

  constructor(){
  }
}
