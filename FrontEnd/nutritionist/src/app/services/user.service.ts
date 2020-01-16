import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import {User} from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = `${environment.baseUrl}`;



  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string): Observable<HttpResponse<any>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      }),
    };
    return this.httpClient.get(`${this.baseUrl}/authenticate`, {
      headers: httpOptions.headers,
      observe: 'response'
    });
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/users`, user)
  }
  userExists(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/users?username=${username}`);
  }
  getUser(username: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/${username}`);
  }
  updateUser(user:User):Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/users`, user)
  }
  changePassword(userId:string, oldPassword:string, newPassword:string): Observable<any> {
   
    return this.httpClient.put(`${this.baseUrl}/users/change/${userId}`, {"oldPassword": oldPassword, "newPassword": newPassword});
  }
}
