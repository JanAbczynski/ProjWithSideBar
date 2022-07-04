import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SideBar } from '../../../models/TurboPuszka/SideBar';
import { CommonServiceService } from '../../../services/common-service.service';
import { YesOrNoComponent } from '../../yes-or-no/yes-or-no.component';

@Component({
  selector: 'app-tpside-bar',
  templateUrl: './tpside-bar.component.html',
  styleUrls: ['./tpside-bar.component.css']
})
export class TPsideBarComponent implements OnInit {

  newMenu: SideBar = {};
  menus: any;
  userRole: any;
  userType: any;

  constructor(
    private commonService: CommonServiceService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetMenus();
    this.GetUserRole();
    this.GetUserType();
  }

  Test(){
    console.log(this.menus );
  }

  OnSubmitSideBar(){
    
  }

  AskForDelete(deletedId: any){

    this.OpenYesNo("Czy chcesz usunąć wpis", deletedId);
  }

  DeleteMenu(deleteId: any){
    this.commonService.DeleteMenu(deleteId)
    .subscribe({
      next: ((value: any) => {
        this.commonService.ReloadMenuInit();
        this.commonService.ShowSuccess("Menu usunięte","")
        this.ngOnInit();
      }),
      error: ((value: any) => {
        this.commonService.ShowError(value,"Błąd")
        
      })
      }
    )
  }

  OpenYesNo(message: string, Id: string){
    let dialogBox = this.dialog.open(YesOrNoComponent);
    dialogBox.componentInstance.message =  message;
    dialogBox.componentInstance.exeternalID = Id;
    dialogBox.afterClosed().subscribe(result =>{

      if(result.answer){
        this.DeleteMenu(result.externalID);
      }
    })
  }

  OnSubmit(f: any){

    let updateValues = f.value;
    

    this.commonService.UpdateSubMenu(updateValues)
    .subscribe({
      next: ((value: any) => {
        this.commonService.ReloadMenuInit();
        this.commonService.ShowSuccess("Menu zauktualizowane","")
        this.newMenu = {};
        this.ngOnInit();
      }),
      error: ((value: any) => {
        this.commonService.ShowError(value,"Błąd")
        
      })
      }
    )
  }

  GetUserRole(){
    this.commonService.GetEnums('UserRole')
    .subscribe({
      next: ((value: any) => {
        this.userRole = value;
      }),
      error: ((value: any) => {
        
      })
      }
    )
  }


  GetUserType(){
    this.commonService.GetEnums('UserType')
    .subscribe({
      next: ((value: any) => {
        this.userType = value;
      }),
      error: ((value: any) => {
        
      })
      }
    )
  }



  GetMenus(){
    this.commonService.GetMenus()
    .subscribe({
      next: ((value: any) => {
        this.menus = value;
      }),
      error: ((value: any) => {
        
      })
      }
    )
  }

  GenDefaultPermission(){
    this.commonService.GenDefaultPermission()
    .subscribe({
      next: ((value: any) => {
        this.menus = value;
      }),
      error: ((value: any) => {
        
      })
      }
    )
  }
}
