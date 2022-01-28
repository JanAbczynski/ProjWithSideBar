import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserType } from '../../enums/UserType'


@Component({
  selector: 'app-sidebar-page',
  templateUrl: './sidebar-page.component.html',
  styleUrls: ['./sidebar-page.component.css']
})
export class SidebarPageComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }

  showAll = false;
  isColisSidebarClesed2lapsed = true;
  show = false;
  @Input() isSidebarClosed: boolean = true;

  ngOnInit(): void {
    let token = this.loginService.GetTokenInfo();
    if(token != null){
      let role = token['role'];
      let userType = token['userType'];
    }else{
      console.log("AKCJA NA WYLOGOWANIE")
    }

    this.show = true;
    this.UnoMomento()


  }

  UnoMomento(){
    setTimeout(()=>{
      this,this.showAll=true; },100)
  }
  

  Show(x : any){

    let AllowedMenu = ['Zawody', 'opcja 1', 'opcja 2', 'Dane osobiste', 'Bezpieczeństwo', 'Profil'];

     if(AllowedMenu.indexOf(x) != -1){
      return true;
     }
    return false;
  }
}
