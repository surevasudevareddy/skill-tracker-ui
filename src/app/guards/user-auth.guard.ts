import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStorageService } from '../shared/services/auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private authStorage:AuthStorageService,private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let role = this.authStorage.getUser().role;
      console.log(role)
      if(!role){
        this.router.navigate(['login'])
        return false
      }else if(role !== "ADMIN"){
       return true
      }else{
        return false
      }
  }
  
}
