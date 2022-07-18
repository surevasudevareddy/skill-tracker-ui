import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  login({userid,password}: any): Observable<any>{
    if(userid != null && password != null){
      localStorage.setItem('pass',password);
      return of({"name": "ABC","emil":"abc@a.com"});
    }
    return throwError(new Error("faild login"));
  }
  logout({userid,password}: any){
    localStorage.removeItem('pass');
    this.router.navigate(['login']);
  }
}
