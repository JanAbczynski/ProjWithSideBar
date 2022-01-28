import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }


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

  GetTokenInfo() {
    let token = localStorage.getItem('token') as string
    let jwtHelper = new JwtHelperService();
    let decodedToken
    if(token != null){
      decodedToken = jwtHelper.decodeToken(token);
    }
    return decodedToken;
  }

  logout(){
    console.log("logout")
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }


}
