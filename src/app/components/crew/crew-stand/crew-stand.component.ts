import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { CrewStand } from '../../../models/Dictionary/CrewStand';
import { CommonServiceService } from '../../../services/common-service.service';
import { ShootingRangeService } from '../../../services/shooting-range.service';



@Component({
  selector: 'app-crew-stand',
  templateUrl: './crew-stand.component.html',
  styleUrls: ['./crew-stand.component.css']
})
export class CrewStandComponent implements OnInit {

  stand: CrewStand = {};
  standsList: CrewStand[] = [];
  editIndex: any = null;


  constructor(
    private commonService: CommonServiceService,
    private shootingRngeService: ShootingRangeService
  ) { }

  ngOnInit(): void {
    this.GetCrewStands();
  }


  GetCrewStands(){  
    this.shootingRngeService.GetCrewStands()
    .subscribe({
      next: ((value: any) => {
        this.standsList = value;
      }),
      error: ((value: any) => {
        this.commonService.ShowError(value.error, "")
      })
      }
    )
  }

  
  StartEdit(Id: any){
    this.editIndex = Id;
  }

  Edit(crewStand: any){
    this.shootingRngeService.EditCrewStand(crewStand)
    .subscribe({
      next: ((value: any) => {
        this.commonService.ShowSuccess(value, "")
        this.CancelEdit();
        this.ngOnInit();
      }),
      error: ((value: any) => {
        this.commonService.ShowError(value.error, "")
      })
      }
    )
  }

  CancelEdit(){
    this.editIndex = null;

  }


  AskForDelete(Id: any){
    this.commonService.OpenYesNo("Czy chcesz usunąć stanowisko obsługi", Id)
    .subscribe(
      result =>{
          if(result.answer){
            this.DeleteCrewStand(Id);
          }
        }
    )
  }

  DeleteCrewStand(Id: any){
    this.shootingRngeService.DeleteCrewStand(Id)
    .subscribe({
      next: ((Message: any) => {
        this.commonService.ShowSuccess(Message, "")
        this.ngOnInit();
      }),
      error: ((value: any) => {
        this.commonService.ShowError(value.error, "")
      })
      }
    )
  }

  OnSubmit(f: any){

    let updateValues = f.value;

    this.shootingRngeService.AddCrewStand(updateValues)
    .subscribe({
      next: ((Message: any) => {
        this.commonService.ShowSuccess(Message, "")
        this.stand = {};
        this.ngOnInit();
      }),
      error: ((value: any) => {
        if(value.status == 409){
          console.log(value)
          this.AskForForceAdd(updateValues);
        }
        this.commonService.ShowError(value.error, "")
        
      })
      }
    )
  }



  AskForForceAdd(updateValues: any){
    this.commonService.OpenYesNo("Czy chcesz przywrócić stanowisko obsługi: \"" + this.stand.Name + "\"?", null, "Przywróć", "Anuluj", "Dodaj nowy")
    .subscribe(
      result =>{
          if(result.answer && result.option == 1){
            this.RestoreCrewStand(updateValues);
          }else if(result.answer && result.option == 1){
            this.ForsceAdd(updateValues);
          }
        }
    )
  }

  RestoreCrewStand(updateValues: any){
    this.shootingRngeService.RestoreCrewStand(updateValues)
    .subscribe({
      next: ((Message: any) => {
        this.commonService.ShowSuccess(Message, "")
        this.stand = {};
        this.ngOnInit();

      }),
      error: ((value: any) => {

      })
      }
    )
  }

  ForsceAdd(updateValues: any){
    this.shootingRngeService.ForsceAdd(updateValues)
    .subscribe({
      next: ((Message: any) => {
        this.commonService.ShowSuccess(Message, "")
        this.stand = {};
        this.ngOnInit();

      }),
      error: ((value: any) => {

      })
      }
    )
  }

}

