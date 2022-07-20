import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';

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
  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
  }
  formSubmit(): void{
    console.log(this.loginForm.value)
    //TODO- call service wiht user deaitls and navigate to appropriate screen, like user, admin or login error
    this.authService.login(this.loginForm.value).subscribe({
      next:(user)=>{
        console.log(user)
        this.router.navigate(['/user',this.f['userId'].value]);
      }
    })
  }
  get f(){ return this.loginForm.controls;}
}
