import { Injectable } from '@angular/core';
import { HttpHelperService } from "app/services/http-helper/http-helper.service";

@Injectable()
export class ElectionService {

  constructor(private httpHelper: HttpHelperService) { }

  create(election) {
    let url = "/election";
    return new Promise<any>((resolve, reject) => {
      this.httpHelper.request('post', url, election)
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

  update(election) {
    let url = "/election";
    return new Promise<any>((resolve, reject) => {
      this.httpHelper.request('put', url, election)
        .map(res => { return res.json(); })
        .subscribe((res) => {
          console.log(res);
          resolve(res);
        }, (error) => {
          console.log("error update election", error);
          reject(error);
        });
    });
  }

  findAll() {
    let url = "/elections";
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


  findElectionsDone() {
    let url = "/elections_done";
    return new Promise<any>((resolve, reject) => {
      this.httpHelper.request('get', url)
        .map(res => { return res.json(); })
        .subscribe((res) => {
          console.log(res);
          resolve(res.elections);
        }, (error) => {
          console.log("error find Elections Done", error);
          reject(error);
        });
    });
  }

  findElectionById(id) {
    let url = "/election/" + id;
    return new Promise<any>((resolve, reject) => {
      this.httpHelper.request('get', url)
        .map(res => { return res.json(); })
        .subscribe((res) => {
          console.log(res);
          resolve(res.election);
        }, (error) => {
          console.log("error find Election By Id", error);
          reject(error);
        });
    });
  }

  findByVoter() {
    let url = "/elections/ByVoter";
    return new Promise<any>((resolve, reject) => {
      this.httpHelper.request('get', url)
        .map(res => { return res.json(); })
        .subscribe((res) => {
          console.log(res);
          resolve(res.elections);
        }, (error) => {
          console.log("error find Election By Voter", error);
          reject(error);
        });
    });
  }

}

