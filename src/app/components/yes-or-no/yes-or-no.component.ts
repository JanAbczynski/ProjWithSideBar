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

  ngOnInit(): void {

  }

  Yes(){
    this.dialogRef.close({ answer: true, externalID: this.exeternalID })
  }

  No(){
    this.dialogRef.close({ answer: false, externalID: this.exeternalID  })
  }

  Close(){
    this.dialogRef.close();  
  }
}
