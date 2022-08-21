import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../model/user-profile';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { SKILL_TRACKER_URLS } from './../../constants/api-url.constant';

const url = environment.API_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class TrackerGatewayApiService {


  constructor(private httpClient: HttpClient) { }
  public addUserProfile(userProfile: UserProfile): Observable<any> {
    console.log(userProfile)
    return this.httpClient.post(SKILL_TRACKER_URLS.ADD_PROFILE, userProfile);
  }

  // public getUserProfile(name: any): Observable<any> {
  //   console.log(name)
  //   return this.httpClient.get(url + '/engineer/userAndSkillsByUserName/' + name);
  // }

  public getUserProfile(associateId: any): Observable<any> {
    console.log("associated Id:::" + associateId)
    return this.httpClient.get(SKILL_TRACKER_URLS.GET_PROFILE + associateId);
  }

  public getUserProfiles(criteria: any): Observable<any> {
    return this.httpClient.post(SKILL_TRACKER_URLS.GET_PROFILES, criteria);
  }

  public updateUserProfile(userProfile: UserProfile): Observable<any> {
    return this.httpClient.post(SKILL_TRACKER_URLS.UPDATE_PROFILE, userProfile)
  }
}