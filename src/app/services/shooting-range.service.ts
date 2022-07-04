import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Competition } from '../models/Competition';
import { Filter } from '../models/Filter';
import { ShootingRange } from '../models/shootingRange';
import { TableParams } from '../models/TableParams';
import { TargetModel } from '../models/Target/TargetModel';
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

  // SendTargetImage(xompetition: FormData) {

  //   return this.http.post<any>(this.urlShootingRange + "/AddTarget", xompetition, this.loginService.SetOpts() );
  // }

  
  UploadFile(targetFile: FormData) {
    return this.http.post<any>(this.urlShootingRange + "/UploadTarget", targetFile, this.loginService.SetOpts() );
  }

  
  DeleteTarget(Id: any) {
    return this.http.get<any>(this.urlShootingRange + "/DeleteTarget?id=" + Id , this.loginService.SetOpts());
  }
  
  CopyTarget(Id: any) {
    return this.http.get<any>(this.urlShootingRange + "/CopyTarget?id=" + Id , this.loginService.SetOpts());
  }

  RemoveTempFile(Id: any) {
    return this.http.get<any>(this.urlShootingRange + "/RemoveTempFile?id=" + Id , this.loginService.SetOpts());
  }

  
  AddTarget(targetModel: TargetModel) {
    return this.http.post<any>(this.urlShootingRange + "/SubmitTarget", targetModel, this.loginService.SetOpts() );
  }
  
  SetActive(Id: string) {
    return this.http.get<any>(this.urlShootingRange + "/SetActive?Id=" + Id , this.loginService.SetOpts());
  }

  EditTarget(targetModel: TargetModel) {
    return this.http.post<any>(this.urlShootingRange + "/EditTarget", targetModel, this.loginService.SetOpts() );
  }
  
  GetTargets(tableParams : TableParams) {
    return this.http.post<any>(this.urlShootingRange + "/GetTargets", tableParams , this.loginService.SetOpts());
  }

  GetTarget(Id: string) {
    return this.http.get<any>(this.urlShootingRange + "/GetTarget?Id=" + Id , this.loginService.SetOpts());
  }

  AddCrewStand(CrewStand: any) {
    return this.http.post<any>(this.urlShootingRange + "/AddCrewStand", CrewStand , this.loginService.SetOpts());
  }

  GetCrewStands() {
    return this.http.get<any>(this.urlShootingRange + "/GetCrewStands", this.loginService.SetOpts());
  }

  DeleteCrewStand(Id: any) {
    return this.http.get<any>(this.urlShootingRange + "/DeleteCrewStand?id=" + Id , this.loginService.SetOpts());
  }
  
  EditCrewStand(CrewStand: any) {
    return this.http.post<any>(this.urlShootingRange + "/EditCrewStand", CrewStand , this.loginService.SetOpts());
  }

  ForsceAdd(CrewStand: any) {
    return this.http.post<any>(this.urlShootingRange + "/ForsceAdd", CrewStand , this.loginService.SetOpts());
  }
  RestoreCrewStand(CrewStand: any) {
    return this.http.post<any>(this.urlShootingRange + "/RestoreCrewStand", CrewStand , this.loginService.SetOpts());
  }
}
