import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumModel } from '../../../models/EnumModel';
import { OneRange } from '../../../models/OneRange';
import { ShootingRange } from '../../../models/shootingRange';
import { CommonServiceService } from '../../../services/common-service.service';
import { ShootingRangeService } from '../../../services/shooting-range.service';

@Component({
  selector: 'app-shooting-range-form',
  templateUrl: './shooting-range-form.component.html',
  styleUrls: ['./shooting-range-form.component.css']
})
export class ShootingRangeFormComponent implements OnInit {

  constructor(
    private commonService: CommonServiceService,
    private shootingRange: ShootingRangeService ,
    private router: Router
    ) { }

  shootingRangeModel : ShootingRange = {Address:{}};
  selectedValue: string = "";
  gunsList: EnumModel[]  = [];

  ngOnInit(): void {
    this.GetGuns();
    this.AddOneRange();

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
