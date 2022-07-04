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
import { TargetListComponent } from '../../target/target-list/target-list.component';
import { TargetModel } from '../../../models/Target/TargetModel';
import { CrewStand } from '../../../models/Dictionary/CrewStand';


@Component({
  selector: 'app-competition-menu',
  templateUrl: './competition-menu.component.html',
  styleUrls: ['./competition-menu.component.css']
})
export class CompetitionMenuComponent implements OnInit {

  constructor(public dialog: MatDialog, 
    private shootingRangeService: ShootingRangeService,
    private shootingRngeService: ShootingRangeService, 
    private commonService: CommonServiceService,) { }

    startDate = Date.now();
    endDate = Date.now();
  competition = new Competition()
  shootingRanges: ShootingRangeIndex [] = [];
  competitionModel = new Competition();
  targetModel: TargetModel = {NewSize: {}, NewPoint: {}}
  crewStands: any[] = [];
  standModel: CrewStand = {};

  ngOnInit(): void {
    this.GetShootingRanges();
    this.AddRun();
    this.GetCrewStands();
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

  GetCrewStands(){
    let tableParams = new TableParams();
    this.shootingRngeService.GetCrewStands()
    .subscribe({
      next: ((response: any) => { this.crewStands = response}),
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

  SelectTarget(runId: any){

    console.log(runId);
    this.OpenDialogTarget(runId);
  }

  OpenDialogTarget(runId: string){
    let dialogBox = this.dialog.open(TargetListComponent);
    dialogBox.componentInstance.onlyShow = true;
    dialogBox.afterClosed().subscribe(result =>{
      
      if(result.answer){
         this.GetTarget(runId, result.externalID);
      }
    })
  }

  GetTarget(runId: string, targetId: string){
    this.shootingRangeService.GetTarget(targetId)
    .subscribe({
      next: ((value: any) => {

        this.targetModel.AttachmentFile = {};
        this.targetModel.Id = value.Id;
        this.targetModel.Name = value.Name;
        this.targetModel.Points = value.Points;
        this.targetModel.Size = value.Size;
        this.targetModel.AllowToChange = value.AllowToChange;
        this.targetModel.IsActive = value.IsActive;
        this.targetModel.IsPublic = value.IsPublic;
        if(value.AttachmentFile != undefined){
          this.targetModel!.AttachmentFile = {}
          this.targetModel.AttachmentFile! = value.AttachmentFile;
          this.targetModel.AttachmentFile!.FullName = value.AttachmentFile.NewName + value.AttachmentFile.Extension;
        }
        
        for(let i =0; i < this.competitionModel.Runs!.length; i++){
          if(this.competitionModel!.Runs![i].Id == runId){
            this.competitionModel!.Runs![i].Target = {...this.targetModel};
            
          }
        }

        console.log(this.competitionModel)
      }),
      error: ((value: any) => {

      })
      }
    )
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

  SetStartDate(){
    setTimeout(() => {
      if(this.competition.StartDate! > this.competition.EndDate!){
        this.competition.EndDate = this.competition.StartDate;
      }
    }, 0);
  }

  SetEndDate(){
    setTimeout(() => {
      if(this.competition.StartDate! > this.competition.EndDate!){
        this.competition.StartDate = this.competition.EndDate;
      }
    }, 0);
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
          if(this.competitionModel!.Runs![i].OneRange != undefined){
            for(let j = 0; j < this.competitionModel!.Runs![i].OneRange!.length; j ++){
              if(this.competitionModel!.Runs![i].OneRange![j].ShootingRangeId == srID){
              return true;
              }
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

    AddCrewStand(){
      if(this.competitionModel.Crew == undefined){
        this.competitionModel.Crew = [];
      }

      let crewFromList = this.crewStands.find(x => x.Id == this.standModel.Id);

      let oneCrew: CrewStand = {};
      oneCrew.Id = crewFromList.Id;
      oneCrew.Name = crewFromList.Name;


      this.competitionModel.Crew!.push(oneCrew);

      this.standModel = {};
    }

    InputCustomCrewName(){
        this.commonService.OpenInputDialog('Wprowadź członka załogi')
        .subscribe(
          result =>{
              if(result.answer){
                this.AddCustomCrewName(result.value);
              }
            }
        )
    }

    AddCustomCrewName(name: string){
      this.standModel.Name = name;
      this.standModel.CustomUser = true;

    }

    AskForRemoveModelCrew(){
      this.commonService.OpenYesNo("Czy chcesz usunąć stanowisko " + name + " ?", null)
      .subscribe(
        result =>{
            if(result.answer){
              this.standModel.Name = undefined;
              this.standModel.CustomUser = undefined;
              this.standModel.UserId = undefined;
            }
          }
      )
    }

    AskForRemoveCrew(standIndex: any){
      let name = this.competitionModel.Crew![standIndex].Name;
      this.commonService.OpenYesNo("Czy chcesz usunąć stanowisko " + name + " ?", null)
      .subscribe(
        result =>{
            if(result.answer){
              this.RemoveCrew(standIndex);
            }
          }
      )
    }



    RemoveCrew(standIndex: any){
      let newArray = [];
      for(let i = 0; i < this.competitionModel.Crew!.length; i ++){
        if(i != standIndex){
          newArray.push(this.competitionModel.Crew![i])
        }
      }
      this.competitionModel.Crew = newArray;
    }

    RemoveRun(){

    }

}
