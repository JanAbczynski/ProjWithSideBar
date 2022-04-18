import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableEngine } from '../../../models/tableEngine';
import { TableParams } from '../../../models/TableParams';
import { TargetModel } from '../../../models/Target/TargetModel';
import { CommonServiceService } from '../../../services/common-service.service';
import { ShootingRangeService } from '../../../services/shooting-range.service';



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
    {Description: 'Id', Sort: 0}
  ];
  displayedColumns: string[] = [];
  tableParams: TableParams = {};
  targets: TargetModel[] = [];
  dataSource = new MatTableDataSource(tableData); 
  
   @ViewChild(MatSort) 
  sort: MatSort | any;
  
  @ViewChild(MatPaginator) 
  paginator: MatPaginator | any;
  
  constructor(
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

  HandleTable(){
    for(let i = 0; i < this.tableEngine.length; i++){
      this.displayedColumns.push(this.tableEngine[i].Description as string);
    }
  }

  Edit(Id: string){
    this.router.navigate(['/targets/edit/' + Id])
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
