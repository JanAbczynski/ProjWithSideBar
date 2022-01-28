import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnInit {

  constructor() { }

  startDate = new Date(1990, 0, 1);
  userModel = new User();
  ngOnInit(): void {
  }


  OnSubmitChangeData(){
    
  }


}
