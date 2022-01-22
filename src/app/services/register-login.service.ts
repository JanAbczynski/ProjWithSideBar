import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  url = environment.apiUrl + "/User";
  constructor(
    private http: HttpClient
  ) { }

  public Register (user: User){
    console.log("register works");
    return this.http.post<User>(this.url + "/RegisterNewUser", user);
  }

  public Login (user: User){
    console.log("login");
    return this.http.post<User>(this.url + "/Login", user);
  }
}
