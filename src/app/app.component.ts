import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService as CommonService } from './services/common-service.service';
import { CommonModule } from '@angular/common';

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

  constructor(
    private toastr: ToastrService,
    private commonService: CommonService
    ){}

  ControlSidebar(){
    this.isSidebarClosed = !this.isSidebarClosed;
    this.isCollapsed = !this.isCollapsed
  }

  ReceivedMessage($event : any){
    console.log("received")
    this.isSidebarClosed = $event
  }

  Show(){
    this.commonService.ShowInfo('message', 'title');
    };
  
}
