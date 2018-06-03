import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";

@Injectable()
export class HttpHelperService {

	constructor(public http: Http) { }

	private methods(method: string, url: string, data?: any, options?: any) {
		if (url[0] == '/')
			url = environment.apiUrl + url;
		if (method == 'get' || method == 'delete')
			return this.http[method](url, options);
		else {
			return this.http[method](url, data, options);
		}
	}

	public request(method: string, url: string, data?: any, options?: any): Observable<any> {
		let token = window.localStorage.getItem("token");
		if (token) {
			let headers = new Headers();
			headers.append('Authorization', 'Bearer ' + token);
			headers.append('Accept', 'application/json');
			headers.append('Content-Type', 'application/json');
			options = new RequestOptions({ 'headers': headers });
			return this.methods(method, url, data, options);
		} else
			return this.methods(method, url, data, options);
	}

}
