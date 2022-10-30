import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';
import { InputDialogComponent } from '../components/input-dialog/input-dialog.component';
import { YesOrNoComponent } from '../components/yes-or-no/yes-or-no.component';
import { EnumModel } from '../models/EnumModel';
import { FullPermission } from '../models/FullPermission';
import { LoginService } from './login.service';
import { UUID } from 'angular2-uuid';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  reloadMenu: EventEmitter<boolean> = new EventEmitter();
  dialogMessage: EventEmitter<string> = new EventEmitter();
  loaderStat: EventEmitter<boolean> = new EventEmitter();
  loaderStatus:boolean = false;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private loginService: LoginService,
    public dialog: MatDialog
    ) { }

    urlUser = environment.apiUrl + "/User";
    urlShootingRange = environment.apiUrl + "/ShootingRange";
    urlTurboPuszka = environment.apiUrl + "/TurboPuszka";


    PushStatus(status: boolean){
      this.loaderStatus = status;
      this.emitLoaderStatus(status)
      
    }

    emitLoaderStatus(status: boolean) {
      this.loaderStat.emit(status);
    }
  
    GetStatus(){
      return this.loaderStat;
    }

  ReloadMenuInit(){
    this.reloadMenu.emit();
  }

  ReloadMenuRead(){
    return this.reloadMenu;
  }


  YesNoSendMessage(message: string){
    this.dialogMessage.emit(message);
  }

  GetYesNoSendMessage(){
    return this.dialogMessage;
  }

  ShowSuccess(message: string, title: string, timeOut: number = 2000){
    this.toastr.success(message, title, {
      progressBar: true,
      progressAnimation: "increasing",
      positionClass: "toast-top-center",
      timeOut: timeOut
    })
  }

  ShowInfo(message: string, title: string, timeOut: number = 2000){
    this.toastr.info(message, title, {
      progressBar: true,
      progressAnimation: "increasing",
      positionClass: "toast-top-center",
      timeOut: timeOut
    })
  }

  ShowError(message: string, title: string, timeOut: number = 2000){
    this.toastr.error(message, title, {
      progressBar: true,
      progressAnimation: "increasing",
      positionClass: "toast-top-center",
      timeOut: timeOut
    })
  }

  NewGuid(){

    return UUID.UUID();
  }


  OpenYesNo(message: string, Id: any, yes: any = "Tak", no: any = "Nie", alternate_1_Name:any = null){
    let dialogBox = this.dialog.open(YesOrNoComponent);
    dialogBox.componentInstance.message =  message;
    dialogBox.componentInstance.exeternalID = Id;
    
    dialogBox.componentInstance.yes = yes;

    dialogBox.componentInstance.no = no;

    dialogBox.componentInstance.alternate_1_Name = alternate_1_Name;

    return dialogBox.afterClosed();
  }

  OpenInputDialog(message: string, buttonSubmit: string = "Dodaj", buttonCancel: string = "Anuluj"){
    let dialogInput = this.dialog.open(InputDialogComponent);
    dialogInput.componentInstance.message = message;
    dialogInput.componentInstance.buttonSubmit = buttonSubmit;
    dialogInput.componentInstance.buttonCancel = buttonCancel;
    return dialogInput.afterClosed();
  }


  GetGuns() {
    return this.http.get<EnumModel[]>(this.urlShootingRange + "/GetGuns", this.loginService.SetOpts());
  }

  GetMenus(){
    return this.http.get<any[]>(this.urlTurboPuszka + "/GetMenus", this.loginService.SetOpts());
  }


  GetEnums(EnumType: string) {
    return this.http.get<EnumModel[]>(this.urlTurboPuszka + "/GetEnums?EnumType=" + EnumType, this.loginService.SetOpts());
  }

  GetDocuments(){
    return this.http.get<EnumModel[]>(this.urlUser + "/GetDocuments" , this.loginService.SetOpts());
  }

  GetPermissions(){
    return this.http.get<EnumModel[]>(this.urlUser + "/GetPermissions" , this.loginService.SetOpts());
  }

  GetPermissionDetail(permissionId: any) {
    return this.http.get<EnumModel[]>(this.urlUser + "/GetPermissionDetail?permissionId=" + permissionId, this.loginService.SetOpts());
  }

  UpdateSubMenu(updateValues: any) {
    return this.http.post<EnumModel[]>(this.urlTurboPuszka + "/UpdateMenu", updateValues, this.loginService.SetOpts());
  }
 
  DeleteMenu(deleteId: any) {
    return this.http.get<EnumModel[]>(this.urlTurboPuszka + "/DeleteMenu?menuPartId=" + deleteId, this.loginService.SetOpts());
  }

  GenDefaultPermission() {
    return this.http.get<EnumModel[]>(this.urlTurboPuszka + "/GenDefaultPermission", this.loginService.SetOpts());
  }

  AddPermission(newPermission: FullPermission) {
    return this.http.post<EnumModel[]>(this.urlUser + "/AddPermission", newPermission, this.loginService.SetOpts());
  }





}
