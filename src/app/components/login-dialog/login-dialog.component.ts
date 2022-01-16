import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RegisterLoginService } from 'src/app/services/register-login.service';
import { CommonServiceService as CommonService } from 'src/app/services/common-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor(
    private registerLoginService : RegisterLoginService,
    private commonService: CommonService,
    private dialogRef: MatDialogRef<LoginDialogComponent>
  ) { }

  userModel = new User('','');
  ngOnInit(): void {
  }

  OnSubmitLogin(){
    console.log("submit");
    console.log(this.userModel);
  }

  OnSubmitRegister(){
    console.log(this.userModel);
    this.RegisterNewUser(this.userModel);
  }

  RegisterNewUser(userModel : User){
    this.registerLoginService.Register(userModel)
    .subscribe(
      res => {
        let errorMessage = '';
        console.log("");
      },
      (error: Response) => {
          let errorMessage = JSON.parse(JSON.stringify(error)).error;
          this.commonService.ShowError('message', 'title');
          this.dialogRef.close();
      }
    )
  }


  TabChange(){
    this.userModel = new User('','');
  }


}
