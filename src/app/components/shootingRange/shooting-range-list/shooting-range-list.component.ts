import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ShootingRangeService } from '../../../services/shooting-range.service';
import { CommonServiceService } from '../../../services/common-service.service';
import { Router } from '@angular/router';
import { ShootingRange } from '../../../models/shootingRange';
import { TableEngine } from '../../../models/tableEngine';



let tableData: ShootingRange[] = [];

@Component({
  selector: 'app-shooting-range-list',
  templateUrl: './shooting-range-list.component.html',
  styleUrls: ['./shooting-range-list.component.css']
})
export class ShootingRangeListComponent implements OnInit, AfterViewInit {

  shootingRanges: ShootingRange[] = [];
  displayedColumns: string[] = [];
  tableEngine: TableEngine[] = [
    {Description: 'Name', Sort: 0},
    {Description: 'ZipCode', Sort: 0},
    {Description: 'City', Sort: 0},
    {Description: 'Delete', Sort: 0}
  ];

  dataSource = new MatTableDataSource(tableData);
  @ViewChild(MatSort) 
  sort: MatSort | any;
  
  @ViewChild(MatPaginator) 
  paginator: MatPaginator | any;


  constructor(
    private shootingRngeService: ShootingRangeService,
    private commonService: CommonServiceService,
    private router: Router) { }

  ngOnInit(): void {

    this.HandleTable();
    this.GetShootingRanges();
  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    console.log('this.dataSource.sort');
    console.log(this.dataSource.sort);
    this.dataSource.paginator = this.paginator;
  }

  HandleTable(){
    for(let i = 0; i < this.tableEngine.length; i++){
      this.displayedColumns.push(this.tableEngine[i].Description as string);
    }
  }

  SortMark(field: string){
    let sortMark = 1;

    for(let i = 0; i < this.tableEngine.length; i++){
      if(this.tableEngine[i].Description == field){
        sortMark = this.tableEngine[i].Sort as number;
      }
    }
    return sortMark;
  }


  GetShootingRanges(){
    this.shootingRngeService.GetShootingRanges()
    .subscribe({
      next: ((value: any) => {
        this.shootingRanges = value;
        tableData = value;
        this.dataSource.data = tableData;
      }),
      error: ((value: any) => {      
      })
      }
    )

  }

  AskForDelete(deletedId: any){
    this.commonService.OpenYesNo("Czy chcesz usunąć strzelnice", deletedId)
    .subscribe(
      result =>{
          if(result.answer){
            this.DeleteSR(deletedId);
          }
        }
    )
  }

  CustomSort(field: string){

    let sortDirection: number = 0;

    for(let i = 0; i < this.tableEngine.length; i ++){
      if(this.tableEngine[i].Description == field){
        this.tableEngine[i].Sort = this.tableEngine[i].Sort as number * -1;
        if(this.tableEngine[i].Sort == 0 ){
          this.tableEngine[i].Sort = -1;
        }
      }else{
        this.tableEngine[i].Sort = 0;
      }   
    }


    for(let i = 0; i < this.tableEngine.length; i ++){
      if(this.tableEngine[i].Description == field){
        sortDirection = this.tableEngine[i].Sort as number;
      }   
    }


    if(tableData != undefined){

      var myField = field as keyof typeof tableData[0];

      let sorted = tableData.sort((a,b) => {
        if ((b[myField] ?? 0) < (a[myField] ?? 0)) return 1 * sortDirection;
        if ((b[myField] ?? 0) > (a[myField] ?? 0)) return -1 * sortDirection;
        return 0;
      });


        this.dataSource.data = sorted
    }
  }


  Edit(Id: string){
    this.router.navigate(['/shootingRange/edit/' + Id])
  }

  DeleteSR(deletedId: string){
    this.commonService.PushStatus(true);
    this.shootingRngeService.DeleteShootingRange(deletedId)
    .subscribe({
      next: ((value: any) => {
        this.commonService.PushStatus(false);
        this.commonService.ShowSuccess('Usunięto strzelnice','');
        this.ngOnInit();
      }),
      error: ((value: any) => {
        console.log(value.error);
        this.commonService.PushStatus(false);
        this.commonService.ShowError(value.error,'');
      })
      }
    )
  }


  customFIlter(filterValue: any){
    let data =[];

    for(let i = 0; i < tableData.length; i++){
      let x = tableData[i].Name?.toLowerCase();
      if(tableData[i].Name?.toLowerCase().includes(filterValue.toLowerCase())){
        data.push(tableData[i]);
        console.log(data);
      }
    }

    this.dataSource.data = data;
  }


  applyFIlter(filterValue: any){
    // console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
