import { Injectable, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user;
    const localstore = localStorage.getItem('user');
    if (localstore) {
      user = JSON.parse(localstore);
    }
    const isLogedin = user?.isLogedin ? user?.isLogedin : false;
    const { routeConfig } = route;
    const { path } = routeConfig as Route;

    if (
      (path?.includes('todos') && isLogedin === true) ||
      (path?.includes('todo') && isLogedin === true)
    ) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
