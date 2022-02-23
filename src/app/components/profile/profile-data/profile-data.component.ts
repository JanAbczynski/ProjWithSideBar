import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gender } from '../../../models/Gender';
import { User } from '../../../models/user';
import { Country } from '../../../models/Country';
import { LoginService } from '../../../services/login.service';
import { RegisterLoginService } from '../../../services/register-login.service';
import { LoaderService } from '../../../services/loader.service';
import { CommonServiceService } from '../../../services/common-service.service';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private registerService: RegisterLoginService,
    private loaderService: LoaderService,
    private commonService: CommonServiceService
    ) { }

    allowTOChangePass = false;
    allowTOChangeEmail= false;


  startDate = new Date(1990, 0, 1);
  userModel = new User();
  val: boolean = false;
  genders: Gender[] = [];
  changeEmailInfo = false;

  
  countries: Country[] = [
    {Value : "1", FullName : "Polska" },
    {Value : "2", FullName: "Niemcy" },
    {Value : "3", FullName: "Francja" }
    
  ];

  ngOnInit(): void {

    this.registerService.GetUserData()
    .subscribe({
      next: ((response: any) => {
        this.userModel = response;
        this.userModel.SecondEmail=this.userModel.Email;
      }),
      error:((response: any) => {
      })
    })

    this.registerService.GetGender()
    .subscribe({
      next: ((response: any) => { this.genders = response}),
      error: ((response: any) => {})
    })

  }

  Test(){
  }





  

  OnSubmitChangePersonalData(){
    this.commonService.PushStatus(true);
    this.ChangePersonalData(this.userModel)
    
  }

  ChangePersonalData(user: User){
    this.registerService.ChangePersonalData(user)
    .subscribe({
      next : ((response: any) => {this.userModel = response}),
      error : ((response : any) => {})
    })
    this.commonService.PushStatus(false);
  }







  StartToChangeEmail(){
    this.allowTOChangeEmail = !this.allowTOChangeEmail;
    if(this.allowTOChangeEmail){
      this.allowTOChangePass = false;
    }
  }

  OnSubmitChangePassword(){
    this.commonService.PushStatus(true);
    this.ChangePass(this.userModel);
  }

  ChangePass(user: User){
    this.registerService.ChangePassword(user)
    .subscribe({
      next : ((response: any) => {
      }),
      error : ((response : any) => {
        })
    })
    this.commonService.PushStatus(false);
  }




  StartToChangePass(){
    this.allowTOChangePass = !this.allowTOChangePass;
    if(this.allowTOChangePass){
      this.allowTOChangeEmail = false;
    }
  }

  OnSubmitChangeAddressData(){
    this.commonService.PushStatus(true);
    this.ChangeAddressData(this.userModel)
  }

  ChangeAddressData(user: User){
    this.registerService.ChangeAddressData(user)
    .subscribe({
      next : ((response: any) => {this.userModel = response}),
      error : ((response : any) => {})
    })
    this.commonService.PushStatus(false);
  }


  OnSubmitChangeEmail(){
    this.ChangeEmail(this.userModel);
  }

  ChangeEmail(user:User){

    this.registerService.ChangeEmail(user)
    .subscribe({
      next : ((response: any) => {
        this.changeEmailInfo = true; 
      }),
      error : ((response : any) => {
      })
    })
  }

}
