import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-page',
  templateUrl: './sidebar-page.component.html',
  styleUrls: ['./sidebar-page.component.css']
})
export class SidebarPageComponent implements OnInit {
  constructor() { }

  isColisSidebarClesed2lapsed = true;
  ngOnInit(): void {
  }

  @Input() isSidebarClosed: boolean = true;
  


}
