import { Component, inject } from '@angular/core';
import { GoodsService } from '../goods.service';
import { BusketComponent } from '../busket/busket.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [BusketComponent, RouterLink, RouterModule],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {
  goods = inject(GoodsService);

  findInfoValue = ``;
  
  GettingValue(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.findInfoValue = inputElement.value;
  }
  
  filteredGoods = this.goods.goodList;

  isClosed = true;

  CartBtn() {
    this.isClosed = false;
  }

  handleClosedEvent(closed: boolean) {
    this.isClosed = closed;
  }
}
