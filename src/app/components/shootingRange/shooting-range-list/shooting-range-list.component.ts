import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ShootingRangeService } from '../../../services/shooting-range.service';
import { CommonServiceService } from '../../../services/common-service.service';
import { Router } from '@angular/router';
import { ShootingRange } from '../../../models/shootingRange';
import { TableEngine } from '../../../models/tableEngine';
import { Filter } from '../../../models/Filter';
import { TableParams } from '../../../models/TableParams';
import { ShootingRangeViewComponent } from '../shooting-range-view/shooting-range-view.component';
import { MatDialog } from '@angular/material/dialog';



let tableData: ShootingRange[] = [];

@Component({
  selector: 'app-shooting-range-list',
  templateUrl: './shooting-range-list.component.html',
  styleUrls: ['./shooting-range-list.component.css']
})
export class ShootingRangeListComponent implements OnInit, AfterViewInit {

  shootingRanges: ShootingRange[] = [];
  
  tableParams: TableParams = {};

  displayedColumns: string[] = [];
  
  tableEngine: TableEngine[] = [
    {Description: 'Name', Sort: 0},
    {Description: 'ZipCode', Sort: 0},
    {Description: 'City', Sort: 0},
    {Description: 'OneRanges', Sort: 0},
    {Description: 'Delete', Sort: 0},
    {Description: 'Public', Sort: 0}
  ];

  customFilter = {public :  true, private: true};


  dataSource = new MatTableDataSource(tableData);
  @ViewChild(MatSort) 
  sort: MatSort | any;
  
  @ViewChild(MatPaginator) 
  paginator: MatPaginator | any;


  constructor(
    private shootingRngeService: ShootingRangeService,
    private commonService: CommonServiceService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.HandleTable();
    this.GetShootingRanges(this.tableParams);
  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Search(){
  //   if(this.Name == ""){
  //     this.ngOnInit();
  //   }else{
  //     this.shootingRanges = this.shootingRanges.filter(res => {
  //       res.Name = res.Name as string;

  //       return res.Name.toLocaleLowerCase().match(this.Name.toLocaleLowerCase());
  //     })
  //   }
  // }

  key = 'Id';
  reverse: boolean = false;

  Sort(keyFN: string){
    this.key = keyFN;
    this.shootingRanges.sort
    // this.reverse = !this.reverse;
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


  GetShootingRanges(filter : TableParams){
    this.shootingRngeService.GetShootingRanges(filter)
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

  customFIlter2(filterValue: any, fieldName: string){
    let filter: Filter = {Name: fieldName, Value: filterValue};


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

  Details(Id: any){
    let dialogBox = this.dialog.open(ShootingRangeViewComponent);
    dialogBox.componentInstance.exeternalID = Id;
  }


  customFIlter(filterValue: any, fieldName: string){
    let data =[];

    let field = fieldName as keyof typeof tableData[0];

    for(let i = 0; i < tableData.length; i++){
      let fieldData = tableData[i][field];

      if(typeof fieldData === 'string'){
        let stringFieldData = fieldData as string;
        if(stringFieldData?.toLowerCase().includes(filterValue.toLowerCase())){
          data.push(tableData[i]);
          console.log(data);
        }
      }
    }
    this.dataSource.data = data;
    console.log(this.dataSource);
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
        this.commonService.ShowError(value.error.Message, value.error.Message_2);
      })
      }
    )
  }




  applyFIlter(filterValue: any){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
