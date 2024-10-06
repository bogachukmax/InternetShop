import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { val } from '../shared/val.directive';
import { imgUpload } from '../shared/imgUpload.directive';
import { GoodsService, Item } from '../../goods.service';
import { ItemEditComponent } from '../item-edit/item-edit.component';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, ItemEditComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  goods = inject(GoodsService);
  products: Item[] = []
  // products: {name: string, description: string, img: string, price: string, amount: number, coments: []}[] = this.goods.goodList
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
  costBorder: string = this.bgClGreen
  editingProductIndex: number | null = null;

  myForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, val(/^[а-яА-Яa-zA-Zіїє ]+$/, 'letters & spaces')
    ]),
    description: new FormControl('', [
      Validators.required, val(/^[а-яА-Яa-zA-Z0-9іїє ]+$/, 'letters, numbers & spaces')
    ]),
    img: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [imgUpload]
    }
     ),
    cost: new FormControl('', [
      Validators.required, val(/^[0-9]+$/, 'only numbers'),
      Validators.maxLength(6)
    ]),
  })

  constructor() {    
    this.myForm.statusChanges.subscribe((status) => {
      const nameForm = this.myForm.controls.name
      const descForm = this.myForm.controls.description
      const imgForm = this.myForm.controls.img
      const costForm = this.myForm.controls.cost
      
      
      nameForm.errors !== null && nameForm.value !== null && !nameForm.pristine ? this.nameBorder = this.bgClRed : this.nameBorder = this.bgClGreen
      descForm.errors !== null && descForm.value !== null  && !descForm.pristine ? this.descBorder = this.bgClRed : this.descBorder = this.bgClGreen
      imgForm.errors !== null && imgForm.value !== null && !imgForm.pristine ? this.imgBorder = this.bgClRed : this.imgBorder = this.bgClGreen
      costForm.errors !== null && costForm.value !== '' && !costForm.pristine ? this.costBorder = this.bgClRed : this.costBorder = this.bgClGreen
    })
    
  
  }

  ngOnInit(){
    this.goods.saveToLocalStorage('goodList', this.goods.goodList);
    // this.products = this.goods.goodList
    // console.log(this.products);
    this.products = this.goods.loadFromLocalStorage('goodList') || [];
  }

  symbolsTrack() {
    this.symbolsCounter = this.myForm.controls.description.value!.length
    let res = this.maxLengthDesc - this.symbolsCounter
    this.symbolsLeft = res
  }

  onSubmit(){
    if(this.myForm.valid){
      const newItem: Item = {
        name: this.myForm.controls.name.value!,
        description: this.myForm.controls.description.value!,
        img: this.myForm.controls.img.value!,
        price: `${this.myForm.controls.cost.value!}₴`,
        amount: 1,
        coments: []
      }
      this.goods.goodList.push(newItem)
      this.products.push(newItem)
      this.myForm.reset()
      this.goods.saveToLocalStorage('goodList', this.goods.goodList);
      this.symbolsLeft = 500 //!
    }

  }

  onDelete(index: number){
    if(confirm('Ви впевнені? Видалити цей продукт назавжди?')){
      this.goods.removeProduct(index)
      this.products.splice(index, 1)
      this.goods.saveToLocalStorage('goodList', this.goods.goodList)
    }
  }

  onEdit(item: Item, index: number){
    this.editingProductIndex = index; // Сохраняем индекс редактируемого товара
    this.myForm.patchValue({
      name: item.name,
      description: item.description,
      img: item.img,
      cost: item.price.replace('₴', '') // Убираем знак валюты для редактирования
    });
    this.symbolsLeft = this.maxLengthDesc - this.myForm.controls.description.value!.length;
  }

  onSubmit2(){
    if (this.myForm.valid) {
      const updatedItem: Item = {
        name: this.myForm.controls.name.value!,
        description: this.myForm.controls.description.value!,
        img: this.myForm.controls.img.value!,
        price: `${this.myForm.controls.cost.value!}₴`,
        amount: 1,
        coments: []
      };
      
      if (this.editingProductIndex !== null) {
        // Если редактируем, обновляем существующий товар
        this.goods.goodList[this.editingProductIndex] = updatedItem;
        this.products[this.editingProductIndex] = updatedItem;
        this.editingProductIndex = null; // Сбрасываем индекс после редактирования
      } else {
        // Если не редактируем, добавляем новый товар
        this.goods.goodList.push(updatedItem);
        this.products.push(updatedItem);
      }

      this.myForm.reset();
      this.goods.saveToLocalStorage('goodList', this.goods.goodList);
      this.symbolsLeft = 500;
    }
  }
  
}
