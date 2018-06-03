import { Injectable } from '@angular/core';
import { HttpHelperService } from "app/services/http-helper/http-helper.service";

@Injectable()
export class LRSService {

  constructor(private httpHelper: HttpHelperService) { }

  genkeys() {
    let url = "/lrs/genkeys";
    return new Promise<any>((resolve, reject) => {
      this.httpHelper.request('get', url)
        .map(res => { return res.json(); })
        .subscribe((res) => {
          console.log(res);
          resolve(res);
        }, (error) => {
          console.log("error genkeys", error);
          reject(error);
        });
    });
  }

  lrs(privatekey, i, msg, ring) {
    let url = "/lrs/sign";
    let body = {
      "privatekey": privatekey,
      "i": i,
      "msg": msg,
      "ring": ring
    }
    return new Promise<any>((resolve, reject) => {
      this.httpHelper.request('post', url, body)
        .map(res => { return res.json(); })
        .subscribe((res) => {
          console.log(res);
          resolve(res);
        }, (error) => {
          console.log("error lrs", error);
          reject(error);
        });
    });
  }

}
