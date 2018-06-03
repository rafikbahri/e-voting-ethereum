import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "app/services/auth.service";
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this will be passed from the route config
    // on the data property
    let expectedRole = route.data.expectedRole;

    let token = window.localStorage.getItem('token');

    // decode the token to get its payload
    let tokenPayload = jwt_decode(token);

    if (!this.authService.isAuthenticated() || tokenPayload.user.role !== expectedRole) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
