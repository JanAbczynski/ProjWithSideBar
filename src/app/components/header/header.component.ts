import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

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


}
