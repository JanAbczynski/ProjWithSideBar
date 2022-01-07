import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  myVar = false;
  isSidebarClosed: boolean =true;
  @Output() messageEvent = new EventEmitter<string>();



  ControlSidebar(){
    this.isSidebarClosed = !this.isSidebarClosed;
    this.isCollapsed = !this.isCollapsed
  }

  ReceivedMessage($event : any){
    console.log("received")
    this.isSidebarClosed = $event
  }
}
