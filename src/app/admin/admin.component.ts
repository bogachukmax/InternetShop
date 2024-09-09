import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, ReactiveFormsModule, AdminDashboardComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  valid: boolean = false
  checker: any
  logCheck: { isLogged: boolean } = {
    isLogged: this.valid
  }

  inpControl = new FormControl('', [
    Validators.required
  ])

  constructor(){
    this.inpControl.statusChanges.subscribe((status) => {
      // console.log(status);
      // console.log(this.inpControl.valid);
      
    })
  }

  ngOnInit() {
    const sessionData = sessionStorage.getItem('LogCheck')
    if(sessionData){
      this.checker = JSON.parse(sessionData)
      this.valid = this.checker.isLogged
      this.logCheck.isLogged = this.valid
    }
  }

  onLog(){
    if(this.inpControl.value === 'admin' && this.inpControl.valid){
      this.valid = true
      this.logCheck.isLogged = this.valid
      sessionStorage.setItem('LogCheck', JSON.stringify(this.logCheck))
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