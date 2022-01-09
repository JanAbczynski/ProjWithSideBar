import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RegisterLoginService } from 'src/app/services/register-login.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor(
    private registerLoginService : RegisterLoginService
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
          console.log("errorMessage")
          console.log(errorMessage)
      }
    )
  }


  TabChange(){
    this.userModel = new User('','');
  }

}
