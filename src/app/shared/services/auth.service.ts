import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  login({'userId':userid,'password':password}: any): Observable<any>{
    console.log(userid)
    if(userid != null && password != null){
      localStorage.setItem('pass',password);
      return of({"name": userid,"password":password});
    }
    return throwError(new Error("faild login"));
  }
  logout({userid,password}: any){
    localStorage.removeItem('pass');
    this.router.navigate(['login']);
  }
}
