import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { GoodsService } from '../goods.service';
import { NgFor, NgIf } from '@angular/common';

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
  busketListArray = this.busketList.busket;
  
  checking(event:MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    const parentElement = clickedElement.closest('button') || clickedElement;
    const childDiv = parentElement.querySelector('.verticalDotsMenu') as HTMLElement;
    
    if (childDiv) {
      childDiv.style.display = "block";
    } else {

    }
  }

  deleting(event:MouseEvent, index:number){

  }

  btnCloseOpen(){
    console.log("Button from busket: " + this.isClosed);
    this.isClosed = true;
    this.closed.emit(true);
  }
} 
