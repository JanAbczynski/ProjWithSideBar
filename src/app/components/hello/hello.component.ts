import { Component, OnInit } from '@angular/core';
import { LoaderService } from "../../services/loader.service"
import { HeaderComponent } from '../header/header.component'

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  constructor(private loaderService: LoaderService,
    private headerComponent: HeaderComponent) { }

  loader: boolean = false;


  ngOnInit(): void {
  }

  RunLoader(){
    console.log("LOADER");
    this.loaderService.PushStatus(true);
  }

  StopLoader(){
    this.loaderService.PushStatus(false);
  }
}
