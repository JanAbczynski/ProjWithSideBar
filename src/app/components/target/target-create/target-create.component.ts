import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-target-create',
  templateUrl: './target-create.component.html',
  styleUrls: ['./target-create.component.css']
})
export class TargetCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(file: any){
    console.log(file)
  }
}
