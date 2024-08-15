import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { GoodsService } from '../goods.service';
import { NgFor, NgIf } from '@angular/common';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-busket',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './busket.component.html',
  styleUrl: './busket.component.scss'
})
export class BusketComponent {
  @Input() isClosed:boolean = true;

  @Output() closed = new EventEmitter<boolean>();

  busketList = inject(GoodsService);

  checking(event:MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    const parentElement = clickedElement.closest('button') || clickedElement;
    const childDiv = parentElement.querySelector('.verticalDotsMenu') as HTMLElement;
    
    if (childDiv) {
      childDiv.style.display = "block";
    } else {}
  }

  deleting(index: number) {
    this.busketList.removeFromBusket(index);
  }
 
  btnCloseOpen(){
    this.isClosed = true;
    this.closed.emit(true);
  }

  btnPlus(item: any) {
    if (item.amount < 9999) {
      item.amount += 1;
    } else{
      item.amount = 9999;
    }
  }
  
  btnMinus(item: any) {
    if (item.amount > 1) {
      item.amount -= 1;
    }
  }

  calculateTotalPrice(price: string, amount: number): string {
    const priceValue = parseFloat(price.replace('₴', '').replace(',', ''));
    
    const totalPrice = priceValue * amount;

    return `${totalPrice.toFixed(0)}₴`;
  }
} 
