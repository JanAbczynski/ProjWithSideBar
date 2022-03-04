import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ShootingRange } from '../../models/shootingRange';
import { ShootingRangeIndex } from '../../models/ShootingRangeIndex';
import { TableEngine } from '../../models/tableEngine';
import { TableParams } from '../../models/TableParams';
import { ShootingRangeService } from '../../services/shooting-range.service';



let tableData: ShootingRange[] = [];


@Component({
  selector: 'app-shooting-range-dialog',
  templateUrl: './shooting-range-dialog.component.html',
  styleUrls: ['./shooting-range-dialog.component.css']
})
export class ShootingRangeDialogComponent implements OnInit {

  
  constructor(
    private dialogRef: MatDialogRef<ShootingRangeDialogComponent>,
    private shootingRngeService: ShootingRangeService) { }

    selectedShootingRanges: string[] =[];
    shootingRanges: ShootingRange[] = [];
    exeternalID = "";


  displayedColumns: string[] = [];
  tableEngine: TableEngine[] = [
    {Description: 'Id', Sort: 0},
    {Description: 'Name', Sort: 0},
    {Description: 'ZipCode', Sort: 0},
    {Description: 'City', Sort: 0},
    {Description: 'Delete', Sort: 0}
  ];
  tableParams: TableParams = {};

  dataSource = new MatTableDataSource(tableData);
  @ViewChild(MatSort) 
  sort: MatSort | any;
  
  @ViewChild(MatPaginator) 
  paginator: MatPaginator | any;
  
  ngOnInit(): void {
    this.HandleTable();
    this.GetShootingRanges(this.tableParams);
    console.log(this.selectedShootingRanges);
  }

  HandleTable(){
    for(let i = 0; i < this.tableEngine.length; i++){
      this.displayedColumns.push(this.tableEngine[i].Description as string);
    }
  }

  applyFIlter(filterValue: any){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    console.log('this.dataSource.sort');
    console.log(this.dataSource.sort);
    this.dataSource.paginator = this.paginator;
  }

  GetShootingRanges(filter : TableParams){
    this.shootingRngeService.GetShootingRanges(filter)
    .subscribe({
      next: ((value: any) => {
        this.FilterDisabled(value);
        this.shootingRanges = value;
        tableData = value;
        this.dataSource.data = tableData;
      }),
      error: ((value: any) => {      
      })
      }
    )
  }

  FilterDisabled(data: ShootingRangeIndex[]){

    for(let i = 0; i < data.length; i ++){
      if(this.selectedShootingRanges.includes(data[i].Id as string)){
        data[i].Disabled = true;
      }
    }
  }


  Select(Id: string){
    console.log(Id);
    this.exeternalID = Id;
    this.dialogRef.close({ answer: true, externalID: this.exeternalID })
  }

}
