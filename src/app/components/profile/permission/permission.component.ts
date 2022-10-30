import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FullPermission } from '../../../models/FullPermission';
import { RawPermissionDetail } from '../../../models/RawPermissionDetail';
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

  oldPermission: FullPermission  = {};
  newPermission: FullPermission = {};
  ExpireDate = Date.now();
  jsonModel: string = '';


  permissionForm = new FormControl();

  ngOnInit(): void {
    this.GetPermissions();
    if(this.newPermission != {}){
      console.log(this.newPermission)
    }else{
      
      console.log(this.newPermission)
    }
  }

  Test(){
    console.log(this.newPermission)
  }

  GetPermissions(){
    this.commonService.GetPermissions()
    .subscribe({
      next: ((value: any) => {
        this.permissions = value;

        if(this.oldPermission != undefined){
          this.UpdateOldPermission();
        }
      }),
      error: ((value: any) => {
        this.commonService.ShowError(value.error, "");
      })
      }
    )
  }

  UpdateOldPermission(){
    this.newPermission = {...this.oldPermission};
    this.RewritePermissions();
  }

  RewritePermissions(){
      this.newPermission.RawPermission = null;
      this.newPermission.RawPermission = this.permissions.find(x => x.Id == this.oldPermission.RawPermission.Id);

      if(this.oldPermission.RawPermission.HasEnumDetail){
        this.GetPermissionDetail(this.oldPermission.RawPermission.Id);
      }

  }

  GetPermissionDetail(permissionId: any){
    this.commonService.GetPermissionDetail(permissionId)
    .subscribe({
      next: ((value: any) => {
        this.permissionsDetail = value;

        if(this.oldPermission != undefined){
          this.UpdateOldPermissionDetail();
        }
        
      }),
      error: ((value: any) => {
        this.commonService.ShowError(value.error, "");
      })
      }
    )
  }

  UpdateOldPermissionDetail(){
    this.newPermission.UserPermissionDetail = [];
    for(let i = 0; i < this.oldPermission.UserPermissionDetail!.length; i++){
      let tempDetail = this.permissionsDetail.find(x => x.id == this.oldPermission.UserPermissionDetail![i].Id);
      this.newPermission.UserPermissionDetail.push(tempDetail);
    }
  }

  permissionSelect(){

    if(this.oldPermission != undefined){
      this.oldPermission.UserPermissionDetail =  [];
    }
    this.GetPermissionDetail(this.newPermission.RawPermission.Id);
  }

  Close(){
    this.dialogRef.close()
  }



  OnSubmitPermission(){
    
    if(this.newPermission.UserPermissionDetail != undefined){
      for(let i = 0; i < this.newPermission.UserPermissionDetail.length; i++){
        this.newPermission.UserPermissionDetail[i].RawPermissionDetail = new RawPermissionDetail();

        for(let j = 0; j < this.permissionsDetail.length; j ++){
          if(this.permissionsDetail[j].Id == this.newPermission.UserPermissionDetail[i].Id){
            this.newPermission.UserPermissionDetail[i].RawPermissionDetail = this.permissionsDetail[j];
          }
        }
      }
    }

        console.log(this.newPermission)

    let x = JSON.stringify(this.newPermission);
    this.dialogRef.close(this.newPermission)

  }
}
