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
import { DocumentComponent } from '../document/document.component';

let tableData: FullPermission[] = [];
let documentTableData: FullPermission[] = [];

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
  documentsSource = new MatTableDataSource(documentTableData);

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

  documentDisplayColumn: string[] = [];

  documentTableEngine: TableEngine[] = [
    {Description: 'Document', Sort: 0},
    {Description: 'Details', Sort: 0},
    {Description: 'Number', Sort: 0},
    {Description: 'ExpireDate', Sort: 0}

  ]
  
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

        this.AddPermissionToTable2();
        this.AddDocumentsToTable();
      
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

    for(let i = 0; i < this.documentTableEngine.length; i++){
      this.documentDisplayColumn.push(this.documentTableEngine[i].Description as string);
    }
  }

  PushTableData(tableData: any){
    // this.ConvertToFriendly_Table(tableData)
    this.dataSource.data = tableData;
  }

  pushDocumentToTable(tableData: any){
    this.documentsSource.data = tableData;
  }

  AddDocumentsToTable(){
    this.ConvertDocumentDetailToFriendly(this.userModel.Documents);
    this.pushDocumentToTable(this.userModel.Documents)
  }

  AddPermissionToTable2(){
    this.PushTableData( this.userModel.Permissions);
  }

  Test(){
    console.log(this.userModel)
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

  DialogAddDocuments(document: any = null){
    let dialogBox = this.dialog.open(DocumentComponent);

  }


  DialogAddPermission(permission: any = null){
    let dialogBox = this.dialog.open(PermissionComponent);

    console.log(this.userModel);

    if(permission != {}){
      dialogBox.componentInstance.oldPermission = permission;
    }

    dialogBox.afterClosed().subscribe(result =>{
      if(result != undefined){

        if(permission != undefined){
          this.EditPermission(result);
        }else{
          this.AddPermitions(result);

        }
      }   
    })
  }

  TryEditPermission(Id: string){
   
    if(this.userModel.Permissions != undefined){
      for(let i = 0; i < this.userModel.Permissions.length; i++){

        if(this.userModel.Permissions[i].Id == Id){
          this.DialogAddPermission(this.userModel.Permissions[i])
        }
      }
    }
  }

  EditPermission(permission: FullPermission){
    if(this.userModel.Permissions != undefined){
      for(let i = 0; i < this.userModel.Permissions.length ; i++){
        if(permission.Id == this.userModel.Permissions[i].Id){
        this.userModel.Permissions[i] = permission;
        }
      }

      this.PushTableData( this.userModel.Permissions);
    }
  }

  AddPermitions(permission: FullPermission){
    if(this.userModel.Permissions == undefined){
      this.userModel.Permissions = [];
    }

    if(permission.Id == undefined){
      permission.Id = this.commonService.NewGuid();
    }

    this.userModel.Permissions.push(permission);
    this.PushTableData( this.userModel.Permissions);
  }

  ConvertDocumentDetailToFriendly(documentList: any){

    for(let i = 0; i < documentList.length; i ++){
      documentList[i].DetailsFriendly = this.ConvertToFriendly(documentList[i].Details)
    }
    

  }

  ConvertToFriendly(list: any){

    let friendly = '';
    for(let i = 0; i < list.length; i++){
      friendly = friendly + list[i]['DocumentDetail']['DetailName'] + ', '
    }
    let stringSize = 25;
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

  AskForDeletePermission(Id: string){
    this.commonService.OpenYesNo("Czy chcesz usunąć uprawnienie?", Id)
    .subscribe(
      result =>{
          if(result.answer){
            this.DeletePermission(Id);
          }
        }
    )
  }

  DeletePermission(Id: string){

    if(this.userModel.Permissions != undefined){
      
      let tempList = [];
      for(let i=0; i < this.userModel.Permissions.length; i++){
        if(this.userModel.Permissions[i].Id != Id){
          tempList.push(this.userModel.Permissions[i])
        }
      }

      this.userModel.Permissions = tempList;
      this.PushTableData( this.userModel.Permissions);
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
    this.commonService.PushStatus(true);
    this.registerService.ChangePermissionsData(this.userModel)
    .subscribe({
      next : ((response: any) => {
        this.userModel = response
        this.commonService.ShowSuccess('','Dane zostały zaktualizowane')
      }),
      error : ((response : any) => {
        this.commonService.ShowError('', 'Nie udało się zaktualizować danych')
      })
    })
  }

  ChangeAddressData(user: User){
    this.registerService.ChangeAddressData(user)
    .subscribe({
      next : ((response: any) => {
        this.userModel = response
        this.commonService.ShowSuccess('', 'Dane zostały zaktualizowane')
      }),
      error : ((response : any) => {
        this.commonService.ShowError('', 'Nie udało się zaktualizować danych')
      })
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
