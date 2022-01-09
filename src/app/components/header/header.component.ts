import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginDialogComponent } from 'src/app/components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog){

  }

  isCollapsed = false;

  isSidebarClosed: boolean = false;
  @Output() sidebarControl = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  SidebarControl(){
    this.isSidebarClosed = !this.isSidebarClosed;
    this.sidebarControl.emit(this.isSidebarClosed);
  }


  ControlSidebar(){
    console.log(this.isCollapsed);
    this.isCollapsed = !this.isCollapsed
    console.log(this.isCollapsed);
  }


  OnSubmit(){
    console.log("submit");
  }

  OpenDialog(){
    console.log("open");
    let dialogBox = this.dialog.open(LoginDialogComponent);
    dialogBox.afterClosed().subscribe(result =>{
      console.log(`${result}`);
    })
  }

}
