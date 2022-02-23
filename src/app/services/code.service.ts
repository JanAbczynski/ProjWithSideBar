import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  url = environment.apiUrl + "/Code";
  constructor(
    private http: HttpClient
  ) { }

  public VerifyEmail (code: String){

    return this.http.get<any>(this.url + "/VerifyEmail/?code=" + code);
  }
}
