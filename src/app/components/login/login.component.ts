import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthStorageService } from 'src/app/shared/services/auth-storage.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faLock = faLock;//icon
  loginFailed = false;
  loginForm = new FormGroup({
    userId: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required]),
  })
  constructor(private router: Router, private authService: AuthService, private authStorage: AuthStorageService) { }

  ngOnInit(): void {

    if (this.authStorage.isLoggedIn()) {
      let role = this.authStorage.getUser().role;
      if (!role) {

      } else if (role === "ADMIN") {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user', this.f['userId'].value]);
      }
    }
  }
  formSubmit(): void {
    //TODO- call service wiht user deaitls and navigate to appropriate screen, like user, admin or login error
    this.authService.login(this.loginForm.value.userId, this.loginForm.value.password).subscribe({
      next: (user) => {
        this.authStorage.saveUser(user)
        this.authStorage.saveKey(user.token)
        let role = this.authStorage.getUser().role;
        if (role === "ADMIN") {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user', this.f['userId'].value]);
        }
      },
      error: (err) => {
        //show error message
        console.log(err)
        this.loginFailed = true;
      }
    })
  }
  get f() { return this.loginForm.controls; }
}
