import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private router: Router, private http: HttpClient) { }

  url = environment.apiUrl + "/User";


  SetOpts(){
    let opts = {
      headers: new HttpHeaders({
      "X-Requested-With": "HttpClient"
      }).set(
        "Authorization", this.SetAuthData()
      )
    }
    return opts
  }

  SetAuthData(){
    let token = localStorage.getItem("token")
    if(token != null){
      return "Bearer " + localStorage.getItem("token")!.toString();
    }else{
      return "";
    }
  }


  SetUserType(): boolean {
    let token = localStorage.getItem('token') as string
    let jwtHelper = new JwtHelperService();
    if(token != null){
    let decodedToken = jwtHelper.decodeToken(token);
      if(decodedToken.userType == "company"){
        return true;
      }
    }
    return false;
  }


  public isLogged(){

    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token') as string
    this.SetUserType();
    let expirationDate = jwtHelper.getTokenExpirationDate(token)
    let isExpired = jwtHelper.isTokenExpired(token);

    if(isExpired){localStorage.removeItem('token');}
    return !isExpired;
  }

  
  GetTokenString() {
    let token = localStorage.getItem('token') as string;
    return token;
  }

  GetTokenInfo(token : string) {
    let jwtHelper = new JwtHelperService();
    let decodedToken
    if(token != null){
      decodedToken = jwtHelper.decodeToken(token);
    }
    return decodedToken;
  }


  public LoginGuard(){
    if(!this.isLogged()){
      this.router.navigate(['/profile/security'])
    }
  }

  public retTrue(){

    return true;
  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }


}
