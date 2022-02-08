import { Component, OnInit } from '@angular/core';
import { Competition } from '../../models/Competition';

@Component({
  selector: 'app-competition-menu',
  templateUrl: './competition-menu.component.html',
  styleUrls: ['./competition-menu.component.css']
})
export class CompetitionMenuComponent implements OnInit {

  constructor() { }

  startDate = Date.now();
  competition = new Competition()

  ngOnInit(): void {
  }

  CreateCompetition(){

  }

}
