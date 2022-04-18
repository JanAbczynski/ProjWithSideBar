import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TargetModel } from '../../../models/Target/TargetModel';
import { CommonServiceService } from '../../../services/common-service.service';
import { ShootingRangeService } from '../../../services/shooting-range.service';

@Component({
  selector: 'app-target-edit',
  templateUrl: './target-edit.component.html',
  styleUrls: ['./target-edit.component.css']
})
export class TargetEditComponent implements OnInit {

  constructor(
    private shootingRange: ShootingRangeService ,
    private route: ActivatedRoute, 
    private router: Router,
    private commonService: CommonServiceService
    ) { }

    targetsModel : TargetModel = {};
    id : string | any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.GetTarget(this.id);
  }

  GetTarget(id: string){
    this.shootingRange.GetTarget(id)
    .subscribe({
      next: ((value: any) => {

        this.targetsModel = value;
      }),
      error: ((value: any) => {
   
      })
      }
    )
  }


  
  Submit(){

  }

  OnSubmitEditTarget(){

    this.commonService.PushStatus(true);
    this.shootingRange.EditTarget(this.targetsModel)
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


}
