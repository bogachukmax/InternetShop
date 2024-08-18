import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, NgIf, ReactiveFormsModule, AdminDashboardComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  valid: boolean = false
  inpControl = new FormControl('', [
    Validators.required
  ])

  constructor(){
    this.inpControl.statusChanges.subscribe((status) => {
      // console.log(status);
      // console.log(this.inpControl.valid);
      
    })

  }

  onLog(){
    if(this.inpControl.value === 'admin' && this.inpControl.valid){
      this.valid = true
    } else{
      this.valid = false
    }
  }

  onEnter(event: KeyboardEvent){
    if(event.key === 'Enter'){
      this.onLog()
    }
  }
  
}