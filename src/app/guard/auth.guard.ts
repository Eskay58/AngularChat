import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from '../service/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private sessionService: SessionService,
    private router: Router,
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      return this.sessionService
      .checkLoginState()
      .pipe(
        map(session => {
          if (!session.isLogin) {
            this.router.navigateByUrl('/account/login')
          }
          return session.isLogin;
        }
        )
      );
//       canActivate(next: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot): Observable<boolean> {
// return this.session
// .checkLoginState()
// .pipe(
//   map(session => {
//     // ログインしていない場合はログイン画面に遷移
//     if (!session.login) {
//       this.router.navigate([ '/account/login' ]);
//     }
//     return session.login;
//   })
// );
// }
    }
}
