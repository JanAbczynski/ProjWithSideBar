import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonServiceService } from '../../services/common-service.service';

@Component({
  selector: 'app-yes-or-no',
  templateUrl: './yes-or-no.component.html',
  styleUrls: ['./yes-or-no.component.css']
})




export class YesOrNoComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<YesOrNoComponent>,
    private commonService: CommonServiceService) { }

  subscription: any;
  message = "...";
  exeternalID = "";

  yes: string = "Tak";
  yes_Value: any = 1;

  no: string = "Nie";
  no_Value: any = 0;

  alternate_1_Name: any = null;
  alternate_1_Value: any = 2;

  ngOnInit(): void {

  }

  Yes(){
    this.dialogRef.close({ answer: true, externalID: this.exeternalID, option: this.yes_Value})
  }

  Alternate_1(){
    this.dialogRef.close({ answer: true, externalID: this.exeternalID, option: this.alternate_1_Value  })
  }

  No(){
    this.dialogRef.close({ answer: false, externalID: this.exeternalID, option: this.no_Value  })
  }

  Close(){
    this.dialogRef.close();  
  }
}
