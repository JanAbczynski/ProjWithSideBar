import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OneRange } from '../../../models/OneRange';
import { OneRangeIndex } from '../../../models/OneRangeIndex';
import { ShootingRangeService } from '../../../services/shooting-range.service';



let tableData: OneRangeIndex[] = [];

@Component({
  selector: 'app-select-one-range-dialog',
  templateUrl: './select-one-range-dialog.component.html',
  styleUrls: ['./select-one-range-dialog.component.css']
})




export class SelectOneRangeDialogComponent implements OnInit , AfterViewInit {

  displayedColumns: string[] = [];
  selectedOneRanges: any = [];
  dataSource = new MatTableDataSource(tableData);
  @ViewChild(MatSort) 
  sort: MatSort | any;

  @ViewChild(MatPaginator) 
  paginator: MatPaginator | any;
  
  shootingRangesId: string[] = [];

  oneRange: OneRangeIndex = {};
  exeternalID: string = "";

  constructor(
    private shootingRngeService: ShootingRangeService,
    private dialogRef: MatDialogRef<SelectOneRangeDialogComponent>,) { }

  ngOnInit(): void {
    this.HandleTable();
    this.GetTableData();
  }

  
  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  HandleTable(){

    this.displayedColumns = [ 'ShootingRangeName',  'Description', 'Distance', 'NoOfTargets', 'Button'];
  }

  GetTableData(){

    console.log(this.shootingRangesId);
    this.shootingRngeService.GetOneRangeData(this.shootingRangesId)
    .subscribe({
      next: ((response: any) => {
        this.FilterDisabled(response);
        this.dataSource.data =  response;
      }),
      error: ((response: any) => {})
    })
  }

  
  applyFIlter(filterValue: any){

    console.log( filterValue )
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  Select(Id: any){
    let oneRange = this.dataSource.data.find(x => x.Id == Id) as OneRangeIndex;

    this.oneRange = oneRange;
    this.dialogRef.close({ answer: true, oneRange: this.oneRange })
  }

  FilterDisabled(data: OneRangeIndex[]){

    for(let i = 0; i < data.length; i ++){
      if(this.selectedOneRanges.includes(data[i].Id as string)){
        data[i].Disabled = true;
      }
    }
  }
}
