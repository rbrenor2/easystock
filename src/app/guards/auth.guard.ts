import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(route.url)
    const user = this.authService.getUser()
    const path = route.url.length != 0 ? route.url[0].path : null

    if (user) {
      if (path == 'login') {
        return false
      } else {
        return true
      }
    } else {
      if (path == 'login') {
        return true
      } else {
        return false
      }
    }
  }

}
