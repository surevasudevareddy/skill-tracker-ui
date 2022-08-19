import { Injectable } from '@angular/core';
import { windowTime } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  constructor() { }

  public saveUser(user:any) :void{
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY,JSON.stringify(user))
  }
  public saveKey(token:string):void{
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.setItem(TOKEN_KEY,token)
  }
  public getToken():string | null{
    return window.sessionStorage.getItem(TOKEN_KEY)
  }
  public getUser():any{
    const user = window.sessionStorage.getItem(USER_KEY)
    if(user){
      return JSON.parse(user)
    }
    return {}
  }
  public signOut():void{
    window.sessionStorage.removeItem(USER_KEY)
  }
  isLoggedIn() :boolean{
    return this.getToken() !== null;
  }
}