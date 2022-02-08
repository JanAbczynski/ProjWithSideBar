import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CommonServiceService } from '../../services/common-service.service';
import { LoginService } from '../../services/login.service';
// import { LoginDialogComponent } from 'src/app/components/login-dialog/login-dialog.component';
import { NotifierService } from '../../services/notifier.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component'
import { LoaderService } from "../../services/loader.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private notifierService: NotifierService,
    private loginService: LoginService,
    private commonService: CommonServiceService,
    private loaderService: LoaderService
    ){

  }

  subscription: any;
  isCollapsed = false;
  isLogged = false;
  loaderStatus = false;


  isSidebarClosed: boolean = false;
  @Output() sidebarControl = new EventEmitter<boolean>();

  ngOnInit(): void {
    // this.loaderStatus = this.loaderService.GetStatus();
    this.subscription = this.loaderService.GetStatus()
    .subscribe(item => {
      this.SetLoad(item);
    })
  }

  SetLoad(loaderStatus: any){
    this.loaderStatus = loaderStatus
  }

  GetLoader(){
    this.loaderStatus = !this.loaderStatus;
    console.log(this.loaderStatus )
  }

  SidebarControl(){
    this.isSidebarClosed = !this.isSidebarClosed;
    this.sidebarControl.emit(this.isSidebarClosed);
  }


  ControlSidebar(){
    console.log(this.isCollapsed);
    this.isCollapsed = !this.isCollapsed
    console.log(this.isCollapsed);
  }


  OnSubmit(){
    console.log("submit");
  }

  OpenDialog(){
    console.log("open");
    let dialogBox = this.dialog.open(LoginDialogComponent);
    dialogBox.afterClosed().subscribe(result =>{
      console.log(`${result}`);
    })
  }


  LogOut(){
    this.loginService.logout();
    this.commonService.ShowSuccess("Zostałeś wylogowany", "");
    this.notifierService.showNotification("Zostałeś wylogowany", "");
    this.commonService.ReloadMenuInit();
  }

  noti(){
    let tokenString = this.loginService.GetTokenString();
    console.log(this.loginService.GetTokenInfo(tokenString)['email']);
  }

  GetUserEmail(){
    let tokenString = this.loginService.GetTokenString();
    return this.loginService.GetTokenInfo(tokenString)['email'];
  }

  IsLogged(){
    return this.loginService.isLogged();
  }

}
