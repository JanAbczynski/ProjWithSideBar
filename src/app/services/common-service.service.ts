import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';
import { YesOrNoComponent } from '../components/yes-or-no/yes-or-no.component';
import { EnumModel } from '../models/EnumModel';
import { LoginService } from './login.service';


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


  OpenYesNo(message: string, Id: any){
    let dialogBox = this.dialog.open(YesOrNoComponent);
    dialogBox.componentInstance.message =  message;
    dialogBox.componentInstance.exeternalID = Id;

    return dialogBox.afterClosed();

    // dialogBox.afterClosed().subscribe(result =>{

    //   if(result.answer){
    //     return true;
    //   }else{
    //     return false;
    //   }
    // })

    // return false;


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


  UpdateSubMenu(updateValues: any) {

    return this.http.post<EnumModel[]>(this.urlTurboPuszka + "/UpdateMenu", updateValues, this.loginService.SetOpts());
  }
 
  DeleteMenu(deleteId: any) {
    return this.http.get<EnumModel[]>(this.urlTurboPuszka + "/DeleteMenu?menuPartId=" + deleteId, this.loginService.SetOpts());
  }






}
