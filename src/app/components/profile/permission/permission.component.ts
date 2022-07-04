import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FullPermission } from '../../../models/FullPermission';
import { CommonServiceService } from '../../../services/common-service.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  constructor(
    private commonService: CommonServiceService,
    private dialogRef: MatDialogRef<PermissionComponent>,) { }

  permissions: any[] = [];
  permissionsDetail: any[] =[];
  userId: string = '';

  newPermission: FullPermission = {};
  ExpireDate = Date.now();


  permissionForm = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  ngOnInit(): void {
    this.GetPermissions();

  }


  

  GetPermissions(){
    this.commonService.GetPermissions()
    .subscribe({
      next: ((value: any) => {
        this.permissions = value;
      }),
      error: ((value: any) => {
        this.commonService.ShowError(value.error, "");
      })
      }
    )
  }


  GetPermissionDetail(permissionId: any){
    this.commonService.GetPermissionDetail(permissionId)
    .subscribe({
      next: ((value: any) => {
        this.permissionsDetail = value;
      }),
      error: ((value: any) => {
        this.commonService.ShowError(value.error, "");
      })
      }
    )
  }

  permissionSelect(){

    this.GetPermissionDetail(this.newPermission.Permission.Id);
  }

  Close(){
    this.dialogRef.close()
  }

  Test(){
    console.log(this.newPermission);
  }

  OnSubmitPermission(){

    
    this.dialogRef.close(this.newPermission)
    // this.commonService.AddPermission(this.newPermission)
    // .subscribe({
    //   next: ((value: any) => {
    //     this.permissionsDetail = value;
    //   }),
    //   error: ((value: any) => {
    //     this.commonService.ShowError(value.error, "");
    //   })
    //   }
    // )
  }
}
