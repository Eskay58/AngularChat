import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Session } from '../class/chat';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public session = new Session();
  public sessionSubject: Subject<Session> = new Subject();
  public sessionState = this.sessionSubject.asObservable();

  constructor(private rooter: Router) { }

  login() {
    this.sessionSubject.next(this.session.set());
    this.rooter.navigate(['/']);
  }

  logout() {
    this.sessionSubject.next(this.session.reset());
    this.rooter.navigate(['/account/login']);
  }

}
