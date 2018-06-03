import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Router } from "@angular/router";
import { JwtHelperService } from "app/services/jwt-helper/jwthelper.service";

@Injectable()
export class AuthService {
  status: Observable<boolean>;
  observer: Observer<boolean>;
  constructor(private http: Http, private router: Router,private jwtHelper:JwtHelperService) {
    this.status = new Observable<boolean>(observer => {
      this.observer = observer;
      this.observer.next(this.isAuthenticated());
    }
    );
  }

  login(email: string, password: string) {
    let userCredentials = {
      email: email,
      pwd: password
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return new Promise<boolean>((resolve, reject) => {
      let res;
      this.http.post(environment.apiUrl + '/auth/login', userCredentials, options).map((response) => {
        res = response.json();
      }).toPromise().then((response) => {
        console.log(res);
        window.localStorage.setItem("token", res.token);
        window.localStorage.setItem('user', JSON.stringify(res.user));
        this.changeState(true);
        resolve(true);
      }).catch((error) => {
        console.log("error:", error.json());
        reject(error.json());
      });
    });
  }

  logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.changeState(false);
  }

  changeState(newState: boolean) {
    if (this.observer !== undefined) this.observer.next(newState);
  }

  isAuthenticated() {
    let token = window.localStorage.getItem("token");
    if (token) 
      return !this.jwtHelper.isTokenExpired(token);
    else
      return false;
  }

}
