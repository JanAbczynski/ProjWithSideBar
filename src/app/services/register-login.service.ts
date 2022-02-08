import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { CustomResponse } from '../models/CustomResponse';
import { Gender } from '../models/Gender';
import { User } from '../models/user';
import { LoginService } from '../services/login.service'

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {
  
  url = environment.apiUrl + "/User";
  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  public Register (user: User){
    return this.http.post<User>(this.url + "/RegisterNewUser", user);
  }

  public Login (user: User){
    return this.http.post<User>(this.url + "/Login", user);
  }

  public ChangePersonalData(user: User){
    return this.http.post<User>(this.url + "/ChangePersonalData", user, this.loginService.SetOpts());
  }

  PassReset(user: User) {
    return this.http.post<User>(this.url + "/PassReset", user, this.loginService.SetOpts());
  }

  ChangeAddressData(user: User) {
    return this.http.post<User>(this.url + "/ChangeAddressData", user, this.loginService.SetOpts());
  }

  ChangePassword(user: User) {
    return this.http.post(this.url + "/ChangePassword", user, this.loginService.SetOpts());
  }

  ChangeEmail(user: User) {
    return this.http.post<CustomResponse>(this.url + "/ChangeEmail", user, this.loginService.SetOpts());
  }

  GetAllowMenu(token: string) {

    let data : Object = {Token : token};
    console.log(data)
    console.log( this.loginService.SetOpts())
    return this.http.post<User>(this.url + "/GetAllowMenu", data, this.loginService.SetOpts());
  }

  GetAllowMenu2() {

    console.log( this.loginService.SetOpts())
    return this.http.post<User>(this.url + "/GetAllowMenu2", {} ,this.loginService.SetOpts());
  }


  GetUserData() {
    console.log("GetUserData")
    return this.http.get<User>(this.url + "/GetUserData", this.loginService.SetOpts());
  }

  GetGender() {
    return this.http.get<Gender[]>(this.url + "/GetGender", this.loginService.SetOpts());
  }

  


}
