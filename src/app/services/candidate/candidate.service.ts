import { Injectable } from '@angular/core';
import { HttpHelperService } from "app/services/http-helper/http-helper.service";

@Injectable()
export class CandidateService {

  constructor(private httpHelper: HttpHelperService) { }


  create(candidate) {
    let url = "/candidate";
    return new Promise<any>((resolve, reject) => {
      this.httpHelper.request('post', url, candidate)
        .map(res => { return res.json(); })
        .subscribe((res) => {
          console.log(res);
          resolve(res);
        }, (error) => {
          console.log("error create", error);
          reject(error);
        });
    });
  }

  findAll() {
    let url = "/candidates";
    return new Promise<any>((resolve, reject) => {
      this.httpHelper.request('get', url)
        .map(res => { return res.json(); })
        .subscribe((res) => {
          console.log(res);
          resolve(res.elections);
        }, (error) => {
          console.log("error findAll", error);
          reject(error);
        });
    });
  }

}
