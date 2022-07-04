import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<InputDialogComponent>) { }

  message = '';
  value = '';
  buttonSubmit = "Dodaj"
  buttonCancel = "Anuluj"

  ngOnInit(): void {
  }

  PushAnswer(){
    if(this.value == ''){
      this.Cancel();
    }else{
      this.dialogRef.close({answer: true, value: this.value})
    }
  }


  Cancel(){
    this.dialogRef.close({answer: false, value: this.value})
  }
}
