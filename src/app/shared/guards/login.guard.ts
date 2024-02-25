import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  authService = inject(AuthService)
  router = inject(Router)
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    return this.authService.isLoggedIn().pipe(map((isLoggedIn: boolean) => {
      if(isLoggedIn) {
        this.router.navigateByUrl('/tabs');
        return false;
      }

      return true;
    }));
  }
}
