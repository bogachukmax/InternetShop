import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [RouterLink,RouterModule,NgIf
  ],
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

  SmallerName(){
    return this.name.slice(0, 75);
  }
  
  PressButtonCart(){
    if (this.ButtonTF == false) {
      this.ButtonTF = true
    } else{
      this.ButtonTF = false
    }
  }
}
