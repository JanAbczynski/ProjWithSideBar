import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../services/common-service.service';
import { LoaderService } from "../../services/loader.service"
import { HeaderComponent } from '../header/header.component'

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  constructor(
    private loaderService: LoaderService,
    private headerComponent: HeaderComponent,
    private commonServiceService: CommonServiceService
    ) { }

  loader: boolean = false;


  ngOnInit(): void {
  }

  RunLoader(){
    this.commonServiceService.ReloadMenuInit();
    this.commonServiceService.PushStatus(true);
  }

  StopLoader(){
    this.commonServiceService.PushStatus(false);
  }
}
