import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  inpControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ])

  constructor(){
    console.log(this.inpControl.value); 
  }

  onLog(){
    if(this.inpControl.value === 'admin'){
      console.log('true');      
    } else{
      console.log('false');
      
    }
  }
  
}