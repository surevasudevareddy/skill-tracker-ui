import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthStorageService } from './auth-storage.service';
import { AUTH_URLS } from './../../constants/api-url.constant';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient, private tokenService: AuthStorageService) { }

  login(username: string, password: string): Observable<any> {
    console.log(username)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ":" + password)
      })
    };
    return this.http.post(AUTH_URLS.LOGIN, {}, httpOptions);

  }

  logout(): void {
    console.log("logout")
    this.tokenService.signOut();
    this.router.navigate(['login']);
  }
}
