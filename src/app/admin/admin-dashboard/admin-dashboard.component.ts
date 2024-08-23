import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { val } from '../shared/val.directive';
import { imgUpload } from '../shared/imgUpload.directive';
import { GoodsService } from '../../goods.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  goods = inject(GoodsService);
  item: {name: string, description: string, img: string, price: string, amount: number, coments: []} = {
    img: '',
    name: '',
    price: '1₴',
    description: '',
    amount: 1,
    coments: []
  }
  symbolsCounter: number = 0
  maxLengthDesc: number = 500
  symbolsLeft: number = 500
  bgClGreen: string = 'green'
  bgClRed: string = 'red'
  nameBorder: string = this.bgClGreen
  descBorder: string = this.bgClGreen
  imgBorder: string = this.bgClGreen
  // costBorder: string = this.bgClGreen
  myForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, val(/^[a-zA-Z ]+$/, 'letters & spaces')
    ]),
    description: new FormControl('', [
      Validators.required, val(/^[a-zA-Z0-9 ]+$/, 'letters, numbers & spaces')
    ]),
    img: new FormControl('', {
      // validators: [Validators.required, Validators.pattern(/https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/)],
      asyncValidators: [imgUpload],
      updateOn: 'blur'
    }
     ),
    cost: new FormControl('', [
      Validators.required, val(/^[0-9]+$/, 'only numbers')
    ]),
  })

  constructor() {    
    this.myForm.statusChanges.subscribe((status) => {
      // console.log(this.myForm.controls.img.errors);   
      const nameForm = this.myForm.controls.name
      const descForm = this.myForm.controls.description
      const imgForm = this.myForm.controls.img
      nameForm.errors !== null && nameForm.value !== '' ? this.nameBorder = this.bgClRed : this.nameBorder = this.bgClGreen
      descForm.errors !== null && descForm.value !== '' ? this.descBorder = this.bgClRed : this.descBorder = this.bgClGreen
      imgForm.errors !== null && imgForm.value !== '' ? this.imgBorder = this.bgClRed : this.imgBorder = this.bgClGreen
    })
  }

  symbolsTrack() {
    // console.log(this.myForm.controls.description.value?.length);
    this.symbolsCounter = this.myForm.controls.description.value!.length
    let res = this.maxLengthDesc - this.symbolsCounter
    this.symbolsLeft = res
  }

  onSubmit(){
    const prop = this.myForm.controls
    this.item.name = prop.name.value!
    this.item.description = prop.description.value!
    this.item.img = prop.img.value!
    this.item.price = `${prop.cost.value!}₴`
    this.goods.goodList.push(this.item);

    this.goods.saveToLocalStorage('busket', this.goods.busket);
    this.goods.saveToLocalStorage('goodList', this.goods.goodList);
    
  }
}
