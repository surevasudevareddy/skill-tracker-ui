import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faLock = faLock;
  loginForm = new FormGroup({
    userId: new FormControl('',[Validators.required,Validators.maxLength(50)]),
    password: new FormControl('',[Validators.required]),
  })
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  formSubmit(): void{
    console.log(this.loginForm.value)
    this.router.navigate(['/user']);
  }
  get f(){ return this.loginForm.controls;}
}
