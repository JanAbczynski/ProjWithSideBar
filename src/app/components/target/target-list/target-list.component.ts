import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableEngine } from '../../../models/tableEngine';
import { TableParams } from '../../../models/TableParams';
import { TargetModel } from '../../../models/Target/TargetModel';
import { CommonServiceService } from '../../../services/common-service.service';
import { ShootingRangeService } from '../../../services/shooting-range.service';
import { YesOrNoComponent } from '../../yes-or-no/yes-or-no.component';



let tableData: TargetModel[] = [];


@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css']
})
export class TargetListComponent implements OnInit {

  tableEngine: TableEngine[] = [
    {Description: 'Name', Sort: 0},
    {Description: 'FriendlyPoints', Sort: 0},
    {Description: 'File', Sort: 0},
    {Description: 'Id', Sort: 0},
    {Description: 'Public', Sort: 0}
  ];
  displayedColumns: string[] = [];
  tableParams: TableParams = {};
  targets: TargetModel[] = [];
  dataSource = new MatTableDataSource(tableData); 
  customFilter = {public :  true, private: true};
  onlyShow: boolean = false;
  
   @ViewChild(MatSort) 
  sort: MatSort | any;
  
  @ViewChild(MatPaginator) 
  paginator: MatPaginator | any;
  
  constructor(
    @Optional() private dialogRef: MatDialogRef<YesOrNoComponent>,
    private shootingRangeService: ShootingRangeService,
    private commonService: CommonServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.HandleTable();
    this.GetTargets(this.tableParams);
  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFIlter(filterValue: any){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  HandleTable(){
    for(let i = 0; i < this.tableEngine.length; i++){
      this.displayedColumns.push(this.tableEngine[i].Description as string);
    }
  }

  Edit(Id: string){
    this.router.navigate(['/targets/edit/' + Id])
  }

  modelChange(){
    this.dataSource.data = tableData;
    let tempData = [];
    for(let i = 0; i < this.dataSource.data.length; i++){
      if(this.dataSource.data[i].IsPublic && this.customFilter.public){
        tempData.push(this.dataSource.data[i]);
      }
      if(!this.dataSource.data[i].IsPublic && this.customFilter.private){
        tempData.push(this.dataSource.data[i]);
      }

    }
    this.dataSource.data = tempData;
    this.ngAfterViewInit();
  }

  SelectThis(targetId: any){
    this.dialogRef.close({ answer: true, externalID: targetId  })

  }

  GetTargets(filter : TableParams){
    this.shootingRangeService.GetTargets(filter)
    .subscribe({
      next: ((value: any) => {
        this.targets = value;
        tableData = value;
        console.log(value)
        this.dataSource.data = tableData;
      }),
      error: ((value: any) => {      
        this.commonService.ShowError(value.error, "")
      })
      }
    )
  }

}
