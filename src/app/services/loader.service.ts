import { Injectable, EventEmitter} from '@angular/core';
// import { HeaderComponent } from '../components/header/header.component'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderStat: EventEmitter<boolean> = new EventEmitter();
  loaderStatus:boolean = false;
  constructor() { }

  PushStatus(status: boolean){
    this.loaderStatus = status;
    console.log(this.loaderStatus);
    this.emitLoaderStatus(status)
    
  }

  emitLoaderStatus(status: boolean) {
    this.loaderStat.emit(status);
  }

  GetStatus(){
    return this.loaderStat;
  }
}
