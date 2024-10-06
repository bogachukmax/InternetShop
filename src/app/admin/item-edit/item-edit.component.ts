import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Item } from '../../goods.service';
import { imgUpload } from '../shared/imgUpload.directive';
import { val } from '../shared/val.directive';

@Component({
  selector: 'app-item-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.scss'
})
export class ItemEditComponent {
  symbolsCounter: number = 0
  maxLengthDesc: number = 500
  symbolsLeft: number = 500
  bgClGreen: string = 'green'
  bgClRed: string = 'red'
  nameBorder: string = this.bgClGreen
  descBorder: string = this.bgClGreen
  imgBorder: string = this.bgClGreen
  costBorder: string = this.bgClGreen
  @Input() product: Item | null = null
  @Output() saveProduct = new EventEmitter<Item>()
  @Output() cancelEdit = new EventEmitter<void>()

  editForm = new FormGroup({
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

  

  symbolsTrack() {
    this.symbolsCounter = this.editForm.controls.description.value!.length
    let res = this.maxLengthDesc - this.symbolsCounter
    this.symbolsLeft = res
  }

}
