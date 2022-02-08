import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { RegisterLoginService } from '../../services/register-login.service';
import { UserType } from '../../enums/UserType'
import { CommonServiceService } from '../../services/common-service.service';


@Component({
  selector: 'app-sidebar-page',
  templateUrl: './sidebar-page.component.html',
  styleUrls: ['./sidebar-page.component.css']
})
export class SidebarPageComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private registerLoginService: RegisterLoginService,
    private commonServiceService: CommonServiceService
  ) { }

  showAll = false;
  isColisSidebarClesed2lapsed = true;
  show = false;
  AllowedMenu : any = [];

  @Input() isSidebarClosed: boolean = true;

  ngOnInit(): void {

    this.ReloadMenu();

    this.commonServiceService.ReloadMenuRead()
    .subscribe(x => {
      this.ReloadMenu();
    });
  }


  ReloadMenu(){

    let tokenAsString = this.loginService.GetTokenString();
    let token = this.loginService.GetTokenInfo(tokenAsString);
    if(token != null){
      let role = token['role'];
      let userType = token['userType'];
    }else{
      console.log("AKCJA NA WYLOGOWANIE")
    }

    // this.registerLoginService.GetAllowMenu(tokenAsString)
    // .subscribe({
    //   next: ((response : any) => {this.AllowedMenu = response}),
    //   error: ((resonse : any ) => {})
    // })

    this.registerLoginService.GetAllowMenu2()
    .subscribe({
      next: ((response : any) => {
        this.AllowedMenu = response;
        console.log(this.AllowedMenu);
      }),
      error: ((resonse : any ) => {})
    })


    this.show = true;
    this.UnoMomento()

  }


  UnoMomento(){
    setTimeout(()=>{
      this,this.showAll=true; },100)
  }
  

  Show(x : any){

    // let AllowedMenu = ['Zawody', 'opcja 1', 'opcja 2', 'Dane osobiste', 'Profil'];

    if(this.AllowedMenu == undefined){
      return false;
    }else{
      if(this.AllowedMenu.indexOf(x) != -1){
      return true;
     }
    }

    return false;
  }
}
