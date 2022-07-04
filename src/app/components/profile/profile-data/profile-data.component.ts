import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Gender } from '../../../models/Gender';
import { User } from '../../../models/user';
import { Country } from '../../../models/Country';
import { LoginService } from '../../../services/login.service';
import { RegisterLoginService } from '../../../services/register-login.service';
import { LoaderService } from '../../../services/loader.service';
import { CommonServiceService } from '../../../services/common-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PermissionComponent } from '../permission/permission.component';
import { MatTableDataSource } from '@angular/material/table';
import { TableEngine } from '../../../models/tableEngine';
import { MatSort } from '@angular/material/sort';
import { FullPermission } from '../../../models/FullPermission';


let tableData: FullPermission[] = [];

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
    private commonService: CommonServiceService,
    public dialog: MatDialog
    ) { }

    allowTOChangePass = false;
    allowTOChangeEmail= false;


  startDate = new Date(1990, 0, 1);
  userModel = new User();
  val: boolean = false;
  genders: Gender[] = [];
  changeEmailInfo = false;
  
  dataSource = new MatTableDataSource(tableData);
  @ViewChild(MatSort) 
  sort: MatSort | any;
  displayedColumns: string[] = [];
  tableEngine: TableEngine[] = [
    {Description: 'Permission', Sort: 0},
    {Description: 'Detail', Sort: 0},
    {Description: 'Number', Sort: 0},
    {Description: 'ExpireDate', Sort: 0},
    {Description: 'Buttons', Sort: 0}
  ];
  
  countries: Country[] = [
    {Value : "1", FullName : "Polska" },
    {Value : "2", FullName: "Niemcy" },
    {Value : "3", FullName: "Francja" }
    
  ];

  ngOnInit(): void {
    this.HandleTable();

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

  HandleTable(){
    for(let i = 0; i < this.tableEngine.length; i++){
      this.displayedColumns.push(this.tableEngine[i].Description as string);
    }
  }

  PushTableData(tableData: any){
    this.ConvertToFriendly_Table(tableData)
    this.dataSource.data = tableData;
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
      next : ((response: any) => {
        this.userModel = response
        this.commonService.ShowSuccess("Zaktualizowano dane osobowe", "")
        this.ngOnInit();
      }),
      error : ((response : any) => {})
    })
    this.commonService.PushStatus(false);
  }

  OnSubmitPermission(){
    
  }

  DialogAddPermission(){
    let dialogBox = this.dialog.open(PermissionComponent);

    dialogBox.afterClosed().subscribe(result =>{
      if(result != undefined){
        
        this.AddPermitions(result);
      }
      
    })

  }

  AddPermitions(permission: FullPermission){
    if(this.userModel.Permissions == undefined){
      this.userModel.Permissions = [];
    }

    this.userModel.Permissions.push(permission);
    this.PushTableData( this.userModel.Permissions);
  }

  ConvertToFriendly_Table(tableList: any){

    for(let i = 0; i < tableList.length; i++){
      if(tableList[i].UserPermissionDetail != undefined){

        tableList[i].PermissionDetailFriendly = this.ConvertToFriendly(tableList[i].UserPermissionDetail);
      }
    }
  }

  ConvertToFriendly(list: any){

    let friendly = '';
    for(let i = 0; i < list.length; i++){
      friendly = friendly + list[i]['name'] + ', '
    }
    let stringSize = 20;
    friendly = friendly.substring(0, friendly.length - 2)

    if(friendly.length > stringSize){
      
      friendly = friendly.substring(0, stringSize) + '...';

    }

    return friendly;
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

  SubmitPermissions(){
    this.registerService.ChangePermissionsData(this.userModel)
    .subscribe({
      next : ((response: any) => {this.userModel = response}),
      error : ((response : any) => {})
    })
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
