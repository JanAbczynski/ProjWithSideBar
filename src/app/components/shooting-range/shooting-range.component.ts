import { Component, OnInit } from '@angular/core';
import { customAddress } from '../../models/customAddress';
import { OneRange } from '../../models/OneRange';
import { ShootingRange } from '../../models/shootingRange';

@Component({
  selector: 'app-shooting-range',
  templateUrl: './shooting-range.component.html',
  styleUrls: ['./shooting-range.component.css']
})
export class ShootingRangeComponent implements OnInit {

  constructor() { }

  shootingRangeModel : ShootingRange = {Address:{City : "aaa"}};
  

  ngOnInit(): void {


  }


  Test(){
    console.log(this.shootingRangeModel);
  }
  OnSubmitCreateSR(){

  }


  AddOneRange(){
    let oneRange = new OneRange();
    if(this.shootingRangeModel.OneRange == undefined){
      this.shootingRangeModel.OneRange = [];
    }
    this.shootingRangeModel.OneRange.push(oneRange);
  }



}
