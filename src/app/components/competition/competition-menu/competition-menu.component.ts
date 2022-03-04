import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Competition } from '../../../models/Competition';
import { OneRange } from '../../../models/OneRange';
import { OneRangeIndex } from '../../../models/OneRangeIndex';
import { Run } from '../../../models/Run';
import { ShootingRange } from '../../../models/shootingRange';
import { ShootingRangeIndex } from '../../../models/ShootingRangeIndex';
import { TableParams } from '../../../models/TableParams';
import { ShootingRangeService } from '../../../services/shooting-range.service';
import { ShootingRangeDialogComponent } from '../../shooting-range-dialog/shooting-range-dialog.component';
import { SelectOneRangeDialogComponent } from '../select-one-range-dialog/select-one-range-dialog.component';
import { Guid } from "guid-typescript";
import { CommonServiceService } from '../../../services/common-service.service';

@Component({
  selector: 'app-competition-menu',
  templateUrl: './competition-menu.component.html',
  styleUrls: ['./competition-menu.component.css']
})
export class CompetitionMenuComponent implements OnInit {

  constructor(public dialog: MatDialog, 
    private shootingRngeService: ShootingRangeService, 
    private commonService: CommonServiceService,) { }

  startDate = Date.now();
  competition = new Competition()
  shootingRanges: ShootingRangeIndex [] = [];
  competitionModel = new Competition();
  

  ngOnInit(): void {
    this.GetShootingRanges();
  }

  Test(){
    console.log(this.competitionModel)
  }


  GetShootingRanges(){
    let tableParams = new TableParams();
    this.shootingRngeService.GetShootingRanges(tableParams)
    .subscribe({
      next: ((response: any) => { this.shootingRanges = response}),
      error: ((response: any) => {})
    })

    console.log(this.shootingRanges);
  }

  CreateCompetition(){

  }

  OpenDialog(){
    let dialogBox = this.dialog.open(ShootingRangeDialogComponent);
    dialogBox.componentInstance.selectedShootingRanges = this.ReadSelectedShootingRanged();
    dialogBox.afterClosed().subscribe(result =>{
          this.AddShootingRange(result.externalID);
    })
    }

  SelectOneRange(runId: any){
    this.OpenDialogOneRange(runId);
  }

  OpenDialogOneRange(runId: string){
    let dialogBox = this.dialog.open(SelectOneRangeDialogComponent);
    let shootingRangesId: string[] = [];
    if(this.competitionModel.shootingRanges != undefined){
      for(let i = 0; i < this.competitionModel.shootingRanges!.length; i ++){
        shootingRangesId.push( this.competitionModel!.shootingRanges![i].Id as string);
      }
    }

    dialogBox.componentInstance.selectedOneRanges = this.GetSelectedOneRanges(runId);


    dialogBox.componentInstance.shootingRangesId = shootingRangesId;
    dialogBox.afterClosed().subscribe(result => {
      this.AddOneRange(result.oneRange, runId);
    })
  }  

  GetSelectedOneRanges(runId: string){
    let selectedOneRanges = [];

      for(let i = 0; i < this.competitionModel.Runs!.length; i++){
        if(this.competitionModel.Runs![i].Id == runId && this.competitionModel.Runs![i].OneRange != undefined){
          for(let j = 0; j < this.competitionModel.Runs![i].OneRange!.length; j++){
            selectedOneRanges.push(this.competitionModel.Runs![i].OneRange![j].Id)
          }
        }
      
    }


    return selectedOneRanges;
  }


  AddShootingRange(Id: string){
    console.log(this.competitionModel);

    this.shootingRngeService.GetOneShootingRange(Id)
    .subscribe({
      next: ((value: any) => {
        this.InsertShootingRange(value);
      }),
      error: ((value: any) => {      
      })
      }
    )
  }

  AddOneRange(oneRangeIndex: OneRangeIndex, runId: string){
    
    for(let i =0; i < this.competitionModel.Runs!.length; i ++ ){
      if(this.competitionModel.Runs![i].Id == runId){

          if(this.competitionModel.Runs![i].OneRange == undefined){
            this.competitionModel.Runs![i].OneRange = [oneRangeIndex];
          } else{
            this.competitionModel.Runs![i].OneRange!.push(oneRangeIndex);
          }
      }
    }
  }

    ReadSelectedShootingRanged(){
      let existingShootingRanges: string [] = [];        
      if(this.competitionModel != undefined && this.competitionModel.shootingRanges != undefined){
        for(let i = 0; i < this.competitionModel.shootingRanges.length; i++){
          
          existingShootingRanges.push(this.competitionModel.shootingRanges[i].Id as string)
        }
      }

      return existingShootingRanges;
    }

    InsertShootingRange(shootingRange: ShootingRange){
      if(this.competitionModel.shootingRanges == null){
        let shootingRanges: ShootingRange [] = [];
        shootingRanges.push(shootingRange);
        this.competitionModel.shootingRanges = shootingRanges;
      }else{
        this.competitionModel.shootingRanges.push(shootingRange);
      }
    }

    remove(sr: ShootingRange){

      if(this.competitionModel!.shootingRanges != undefined){
              let newList: ShootingRange[] = [];
      for(let i = 0; i< this.competitionModel!.shootingRanges!.length; i ++){
        if(this.competitionModel!.shootingRanges![i].Id != sr.Id){
          newList.push(this.competitionModel!.shootingRanges![i]);
        }else{
          if(this.CheckIfSRIsConnected(this.competitionModel!.shootingRanges![i].Id)){
            newList.push(this.competitionModel!.shootingRanges![i]);
            this.commonService.ShowError('Do strzelnicy wciąż są przypisane konkurencje. Wpierw odepnij oś w zakładce [Konkurencje]', 'Nie można wykasować strzelnicy', 4500)
          }
          
        }
      }

      this.competitionModel.shootingRanges = newList;
      }
    }

    CheckIfSRIsConnected(srID: any){
      if(this.competitionModel!.Runs != undefined){
        for(let i = 0; i< this.competitionModel!.Runs!.length; i ++){
          for(let j = 0; j < this.competitionModel!.Runs![i].OneRange!.length; j ++){
            if(this.competitionModel!.Runs![i].OneRange![j].ShootingRangeId == srID){
              return true;
            }
          }
        }
      }
      return false;
    }
 
    removeOneRange(or: OneRangeIndex, runId: any){
      let newList: OneRangeIndex[] = [];

      for(let i = 0; i < this.competitionModel.Runs!.length; i ++){
        if(this.competitionModel.Runs![i].Id == runId){
          for(let j = 0; j < this.competitionModel.Runs![i].OneRange!.length; j++){
            if(this.competitionModel.Runs![i].OneRange![j].Id != or.Id){
              newList.push(this.competitionModel.Runs![i].OneRange![j]);
            }
          }

          this.competitionModel.Runs![i].OneRange = newList;
        }
      }
    }

    AddRun(){
      let newRun: Run = {Id: Guid.create().toString()};
      if(this.competitionModel.Runs == undefined){
        this.competitionModel.Runs = [];
        this.competitionModel.Runs.push(newRun);
      }else{
        this.competitionModel.Runs.push(newRun);
      }
    }

}
