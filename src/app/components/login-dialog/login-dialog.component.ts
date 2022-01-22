import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RegisterLoginService } from 'src/app/services/register-login.service';
import { CommonServiceService as CommonService } from 'src/app/services/common-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    private router: Router
  ) { }

  userModel = new User('','');
  ngOnInit(): void {
  }

  OnSubmitLogin(){
    this.Login(this.userModel);
  }

  OnSubmitRegister(){
    this.RegisterNewUser(this.userModel);
  }


  Login(userModel : User){
    this.registerLoginService.Login(userModel)
    .subscribe({
      next: ((value: Object) => {
        console.log("zalogowano")
      }),
      error: ((value: Object) => {

         this.errorLoginMessage = JSON.parse(JSON.stringify(value)).error

         console.log(this.errorLoginMessage);
      })
      }
    )
  }

  RegisterNewUser(userModel : User){
    this.registerLoginService.Register(userModel)
    .subscribe(
      res => {
        console.log("zarejestrowano");
        this.router.navigate(['/hello'])
        this.dialogRef.close();         
      },
      (error: Response) => {
        if(error.status == 409){
          console.log("409");
          let errorMessage = JSON.parse(JSON.stringify(error)).error;
          console.log(errorMessage);
          this.commonService.ShowError(errorMessage, 'Rejestracja');
        }else{
          console.log("409");
          let errorMessage = JSON.parse(JSON.stringify(error)).error;
          console.log(errorMessage);
          console.log(error);
          this.commonService.ShowError(errorMessage, 'Rejestracja');
        }
      }
    )
  }


  TabChange(){
    this.userModel = new User('','');
  }


}
