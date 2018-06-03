import { Injectable } from '@angular/core';
import { HttpHelperService } from "app/services/http-helper/http-helper.service";

@Injectable()
export class UserService {

  constructor(private httpHelper: HttpHelperService) { }

  //add voter
  createVoter(voter) {
    let url = "/user/voter";
    return new Promise<any>((resolve, reject) => {
      this.httpHelper.request('post', url, voter)
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

  //set password
  setPassword(uid, pwd) {
    let body = {
      "uid": uid,
      "pwd": pwd
    }
    let url = "/user/password";
    return new Promise<any>((resolve, reject) => {
      this.httpHelper.request('put', url, body)
        .map(res => { return res.json(); })
        .subscribe((res) => {
          console.log(res);
          resolve(res);
        }, (error) => {
          console.log("error setPassword", error);
          reject(error);
        });
    });
  }

  sendPubkey(pubkey) {
    let body = {
      "publicKey": pubkey
    }
    let url = "/user/publickey";
    return new Promise<any>((resolve, reject) => {
      this.httpHelper.request('put', url, body)
        .map(res => { return res.json(); })
        .subscribe((res) => {
          console.log(res);
          resolve(res);
        }, (error) => {
          console.log("error sendPubkey", error);
          reject(error);
        });
    });
  }



}