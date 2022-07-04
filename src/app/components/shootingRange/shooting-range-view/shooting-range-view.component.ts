import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OneRange } from '../../../models/OneRange';
import { ShootingRange } from '../../../models/shootingRange';
import { TableEngine } from '../../../models/tableEngine';
import { CommonServiceService } from '../../../services/common-service.service';
import { ShootingRangeService } from '../../../services/shooting-range.service';


let tableData: OneRange[] = [];
@Component({
  selector: 'app-shooting-range-view',
  templateUrl: './shooting-range-view.component.html',
  styleUrls: ['./shooting-range-view.component.css']
})
export class ShootingRangeViewComponent implements OnInit {

  constructor(
    private commonService: CommonServiceService,
    private route: ActivatedRoute, 
    private router: Router,
    private shootingRangeService: ShootingRangeService
  ) { }

  id : string | any;
  shootingRangeModel : ShootingRange = {Address:{}, IsEditable : false};
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource(tableData);
  exeternalID = "";
  tableEngine: TableEngine[] = [
    {Description: 'Description', Sort: 0},
    {Description: 'Distance', Sort: 0},
    {Description: 'NoOfTargets', Sort: 0},
    {Description: 'Guns', Sort: 0}
  ];
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.id = this.exeternalID;
    this.HandleTable();
    this.GetShootingRangeData(this.id);
  }
  
  HandleTable(){
    for(let i = 0; i < this.tableEngine.length; i++){
      this.displayedColumns.push(this.tableEngine[i].Description as string);
    }
  }

  GetShootingRangeData(id: string){
    if(this.id != null){
      this.shootingRangeService.GetShootingRangeData(this.id)
      .subscribe({
        next: ((value: any) => {
          this.shootingRangeModel = value;
          if(this.shootingRangeModel.OneRange != undefined){
            tableData = this.shootingRangeModel.OneRange;
          }         
          this.dataSource.data = tableData;
        }),
        error: ((value: any) => {

        })
        }
      )
    }
  }




}
