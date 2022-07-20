import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../model/user-profile';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const url = environment.API_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://localhost:4200' }),
   responseType: 'text' as 'json'
  };

@Injectable({
  providedIn: 'root'
})
export class TackerGatewayApiService {
  

  constructor(private httpClient:HttpClient) { }
  public addUserProfile(userProfile:UserProfile):Observable<any>{
    console.log(userProfile)
    return this.httpClient.post(url+'/add-profile',userProfile);
  }

  public getUserProfile(name:any):Observable<any>{
    console.log(name)
    return this.httpClient.get(url+'/userAndSkillsByUserName/'+name);
  }

  public updateUserProfile(userProfile:any):Observable<any>{
    console.log(userProfile);
    return this.httpClient.post(url+'/update-profile',userProfile)
  }

}