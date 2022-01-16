import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private toastr: ToastrService) { }

  ShowSuccess(message: string, title: string, timeOut: number = 2000){
    this.toastr.success(message, title, {
      progressBar: true,
      progressAnimation: "increasing"
    })
  }

  ShowInfo(message: string, title: string, timeOut: number = 2000){
    this.toastr.info(message, title, {
      progressBar: true,
      progressAnimation: "increasing",
      timeOut: timeOut
    })
  }

  ShowError(message: string, title: string, timeOut: number = 2000){
    this.toastr.error(message, title, {
      progressBar: true,
      progressAnimation: "increasing"
    })
  }




}
