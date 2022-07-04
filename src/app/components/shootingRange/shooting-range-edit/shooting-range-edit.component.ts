import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumModel } from '../../../models/EnumModel';
import { OneRange } from '../../../models/OneRange';
import { ShootingRange } from '../../../models/shootingRange';
import { CommonServiceService } from '../../../services/common-service.service';
import { ShootingRangeService } from '../../../services/shooting-range.service';

@Component({
  selector: 'app-shooting-range-edit',
  templateUrl: './shooting-range-edit.component.html',
  styleUrls: ['./shooting-range-edit.component.css']
})
export class ShootingRangeEditComponent implements OnInit {

  constructor(
    private commonService: CommonServiceService,
    private shootingRange: ShootingRangeService ,
    private route: ActivatedRoute, 
    private router: Router,
    private shootingRangeService: ShootingRangeService
    ) { }

  shootingRangeModel : ShootingRange = {Address:{}, IsEditable : false};
  selectedValue: string = "";
  gunsList: EnumModel[]  = [];
  id : string | any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.GetGuns();
    this.AddOneRange();
    this.GetShootingRangeData(this.id);

  }


  GetShootingRangeData(id: string){
    if(this.id != null){
      this.shootingRangeService.GetShootingRangeData(this.id)
      .subscribe({
        next: ((value: any) => {
          this.shootingRangeModel = value;
        }),
        error: ((value: any) => {

        })
        }
      )
    }
  }


  OnSubmitEdit(){
    
    this.commonService.PushStatus(true);
    this.shootingRangeService.EditShootingRange(this.shootingRangeModel)
    .subscribe({
      next: ((value: any) => {
        this.shootingRangeModel = value;
        this.commonService.PushStatus(false);
        this.commonService.ShowSuccess('Dokonano zmian', '');
        this.ngOnInit();
      }),
      error: ((value: any) => {
        this.commonService.PushStatus(false);
        this.commonService.ShowError(value.error.Message, value.error.Message_2);
      })
      }
    )
  }


  Test(){
  }
  OnSubmitCreateSR(){

    this.commonService.PushStatus(true);
    this.shootingRange.CreateShootingRange(this.shootingRangeModel)
    .subscribe({
      next: ((value: any) => {
        this.commonService.ShowSuccess('Dodano strzelnice','');
        this.commonService.PushStatus(false);
        this.router.navigate(['/shootingRange/list'])

      }),
      error: ((value: any) => {
        this.commonService.ShowError('Błąd podczas dodawania strzelnicy','');
        this.commonService.PushStatus(false);
        
      })
      }
    )
  }

  AskForDeleteOneRange(index:number){
    this.commonService.OpenYesNo("Czy chcesz usunąć oś", index)
    .subscribe(
      result =>{
          if(result.answer){
            this.DeleteOneRange(index);
          }
        }
    )
  }

  DeleteOneRange(index:number){
    if( this.shootingRangeModel.OneRange != undefined){
      let itemToDelete =  this.shootingRangeModel.OneRange[index];
      this.shootingRangeModel.OneRange = this.shootingRangeModel.OneRange.filter(item => item !== itemToDelete)
    }
  }

  GetGuns(){
    this.commonService.GetGuns()
    .subscribe({
      next: ((value: any) => {
        this.gunsList = value;
      }),
      error: ((value: any) => {
        
      })
      }
    )
  }

  AddOneRange(){
    let oneRange = new OneRange();
    if(this.shootingRangeModel.OneRange == undefined){
      this.shootingRangeModel.OneRange = [];
    }
    this.shootingRangeModel.OneRange.push(oneRange);
  }



}
