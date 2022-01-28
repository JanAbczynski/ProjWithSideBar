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
      progressAnimation: "increasing",
      positionClass: "toast-top-center",
      timeOut: timeOut
    })
  }

  ShowInfo(message: string, title: string, timeOut: number = 2000){
    this.toastr.info(message, title, {
      progressBar: true,
      progressAnimation: "increasing",
      positionClass: "toast-top-center",
      timeOut: timeOut
    })
  }

  ShowError(message: string, title: string, timeOut: number = 2000){
    this.toastr.error(message, title, {
      progressBar: true,
      progressAnimation: "increasing",
      positionClass: "toast-top-center",
      timeOut: timeOut
    })
  }




}
