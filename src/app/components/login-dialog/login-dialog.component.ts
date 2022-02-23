import { Component, OnInit } from '@angular/core';
import { RegisterLoginService } from '../../services/register-login.service';
import { CommonServiceService as CommonService } from '../../services/common-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {User} from '../../models/user'
import { NotifierService } from '../../services/notifier.service';
import { LoaderService } from "../../services/loader.service"

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  errorLoginMessage : any = null;

  constructor(
    private registerLoginService : RegisterLoginService,
    private commonService: CommonService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private router: Router,
    private notifierService: NotifierService,
    private loaderService: LoaderService
  ) { }

  userModel = new User();
  ngOnInit(): void {
  }

  OnSubmitLogin(){
    this.Login(this.userModel);
  }

  OnSubmitRegister(){
    this.RegisterNewUser(this.userModel);
  }

  OnSubmitPassReset(){
    this.PassReset(this.userModel)
  }


  Login(userModel : User){
    this.commonService.PushStatus(true);
    this.registerLoginService.Login(userModel)
    .subscribe({
      next: ((response: any) => {
        let token = response['token'];
        localStorage.setItem("token", token);
        this.dialogRef.close();     
        this.commonService.ShowSuccess("Zostałeś zalogowany", "");
        this.commonService.ReloadMenuInit();
        this.notifierService.showNotification("Zostałeś zalogowany", "X");
        this.commonService.PushStatus(false);

      }),
      error: ((value: Object) => {

         this.errorLoginMessage = JSON.parse(JSON.stringify(value)).error
        this.notifierService.showNotification(this.errorLoginMessage, 'X');
        this.commonService.PushStatus(false);
        this.commonService.ReloadMenuInit();
        })
      }
    )
  }

  RegisterNewUser(userModel : User){
    this.registerLoginService.Register(userModel)
    .subscribe(
      res => {
        this.router.navigate(['/hello'])
        this.dialogRef.close();         
      },
      (error: Response) => {
        if(error.status == 409){
          let errorMessage = JSON.parse(JSON.stringify(error)).error;
          this.commonService.ShowError(errorMessage, 'Rejestracja');
        }else{
          let errorMessage = JSON.parse(JSON.stringify(error)).error;
          this.commonService.ShowError(errorMessage, 'Rejestracja');
          this.commonService.ShowError(errorMessage, "Logowanie")
        }
      }
    )
  }

  PassReset(userModel : User){
    this.registerLoginService.PassReset(userModel)
    .subscribe({
      next: ((response: any) => {
        let token = response['token'];
        localStorage.setItem("token", token);
        this.dialogRef.close();     
        this.commonService.ShowSuccess("Zostałeś zalogowany", "");
        this.notifierService.showNotification("Zostałeś zalogowany", "X");
        this.commonService.PushStatus(false);
      }),
      error: ((value: Object) => {

         this.errorLoginMessage = JSON.parse(JSON.stringify(value)).error
        this.notifierService.showNotification(this.errorLoginMessage, 'X');
        this.commonService.PushStatus(false);
        })
      }
    )
  }

  TabChange(){
    this.userModel = new User();
  }


}
