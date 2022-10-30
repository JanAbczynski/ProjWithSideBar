import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../../services/common-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  constructor(
    private commonService: CommonServiceService
    ) { }

    documents: any[] = [];


  ngOnInit(): void {
    this.GetDocuments();
  }


  GetDocuments(){
    this.commonService.GetDocuments()
    .subscribe({
      next: ((value: any) => {
        this.documents = value;

        // if(this.oldPermission != undefined){
        //   this.UpdateOldPermission();
        // }
      }),
      error: ((value: any) => {
        this.commonService.ShowError(value.error, "");
      })
      }
    )
  }
}
