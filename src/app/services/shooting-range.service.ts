import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Filter } from '../models/Filter';
import { ShootingRange } from '../models/shootingRange';
import { TableParams } from '../models/TableParams';
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

  
  GetShootingRanges(tableParams : TableParams) {
    return this.http.post<any>(this.urlShootingRange + "/GetShootingRanges", tableParams , this.loginService.SetOpts());
  }

  
  GetOneShootingRange(Id : string) {
    return this.http.get<any>(this.urlShootingRange + "/GetOneShootingRange?Id=" + Id , this.loginService.SetOpts());
  }

  
  GetShootingRangeData(id: string) {
    return this.http.get<any>(this.urlShootingRange + "/GetShootingRangeData?id=" + id , this.loginService.SetOpts());
  }
  
  DeleteShootingRange(deletedId: string) {
    return this.http.get<any>(this.urlShootingRange + "/DeleteShootingRange?id=" + deletedId , this.loginService.SetOpts());
  }

  GetOneRangeData(shootingRangesId: string[]) {
    return this.http.post<any>(this.urlShootingRange + "/GetOneRangeData", shootingRangesId , this.loginService.SetOpts());
  }
}
