import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CodeService } from '../../services/code.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

public id: string | any;
  constructor(
    private route: ActivatedRoute, 
    private commonService: CodeService) { }
    errorMessage : any = null ;
    correctMessage : any = null;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.VerifyCode(this.id);
  }


  VerifyCode(id: string){
    this.commonService.VerifyEmail(id)
    .subscribe({
      next: ((value: Object) => {
        this.errorMessage = null;
        this.correctMessage = "Ok";
      }),
      error: ((value: Object) => {
        console.log(value);
        this.correctMessage = null;
        this.errorMessage = JSON.parse(JSON.stringify(value)).error;
     })
      }
    )
  }
    




    // .subscribe({
    //   next: ((value: Object) => {
    //     this.errorMessage = null;
    //     console.log(value);
    //     console.log("OK")}),
    //   error: ((value: Object) => {
    //     console.log(value);
    //     this.correctMessage = null;
    //     this.errorMessage = JSON.parse(JSON.stringify(value)).error;
    //     console.log("ERR")})
    //   }
    // )




    
    // .subscribe({
    //   next?:  ((value: Object) => void),  
    //   }
    // )


    // .subscribe(res=>{
    //   this.errorMessage = null;

    //   console.log('correct');
    //   console.log(res);
    //   console.log("Code ok")
    // },
    // (error:Response) => {
    //   console.log('error ---');
    //   console.log(error);
    //   this.correctMessage = null;
    //   this.errorMessage = JSON.parse(JSON.stringify(error)).error;
    // })
    


  }


