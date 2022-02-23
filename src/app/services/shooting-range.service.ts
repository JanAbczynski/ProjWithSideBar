import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { ShootingRange } from '../models/shootingRange';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ShootingRangeService {
  urlShootingRange = environment.apiUrl + "/ShootingRange";
  
  constructor(
    private http: HttpClient,
    private loginService: LoginService) { }
  
  CreateShootingRange(shootingRangeModel: ShootingRange) {

    return this.http.post<any>(this.urlShootingRange + "/AddShootingRange",shootingRangeModel , this.loginService.SetOpts());
  }

  
  EditShootingRange(shootingRangeModel: ShootingRange) {
    return this.http.post<any>(this.urlShootingRange + "/EditShootingRange",shootingRangeModel , this.loginService.SetOpts());
  }

  
  GetShootingRanges() {
    return this.http.get<any>(this.urlShootingRange + "/GetShootingRanges" , this.loginService.SetOpts());
  }

  
  GetShootingRangeData(id: string) {
    return this.http.get<any>(this.urlShootingRange + "/GetShootingRangeData?id=" + id , this.loginService.SetOpts());
  }
  
  DeleteShootingRange(deletedId: string) {
    return this.http.get<any>(this.urlShootingRange + "/DeleteShootingRange?id=" + deletedId , this.loginService.SetOpts());
  }
}
