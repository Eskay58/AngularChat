import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators'
import { Session, Account, User } from '../class/chat';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public session = new Session();
  public sessionSubject: Subject<Session> = new Subject();
  public sessionState = this.sessionSubject.asObservable();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    public afstore: AngularFirestore,
  ) { }
  
  login(account: Account): void {
    this.afAuth
      .signInWithEmailAndPassword(account.email, account.password)
      .then(auth => {
        // メールアドレス確認が済んでいるかどうか
        if (!auth.user?.emailVerified) {
          this.afAuth.signOut();
          return Promise.reject('メールアドレスが確認できていません。');
        } else {
          this.session.isLogin = true;
          this.sessionSubject.next(this.session);
          return this.router.navigate(['']);
        }
      })
      .then(() => alert('ログインしました。'))
      .catch(err => {
        console.log(err);
        alert('ログインに失敗しました。\n' + err);
      });

  }

  logout(): void {
    this.afAuth
      .signOut()
      .then(() => {
        this.sessionSubject.next(this.session.reset());
        return this.router.navigate(['/account/login']);
      }).then(() => alert('ログアウトしました。'))
      .catch( err => {
        console.log(err);
        alert('ログアウトに失敗しました。\n' + err);
      });
  }

  signup(account: Account): void {
    let auth: any;
    let email: string = account.email;
    this.afAuth.
    createUserWithEmailAndPassword(account.email, account.password)
    .then((TEMP_AUTH: any) => {
      auth = TEMP_AUTH;
      auth.user?.sendEmailVerification();
    }) 
    .then(() => {
      return this.createUser(new User(auth.user.uid, account.name));
    })
    .then(() => {
      console.log(2);
      account.reset();
      alert(`${email} へ確認メールを送信しました。`);
      })
    .then(() => {
      setTimeout(() => {
        this.afAuth.signOut()  
      }, 1000);
    })
    .catch(err => { 
      console.log(err);
      alert('アカウントの作成に失敗しました \n' + err);
    });
  }

  private createUser(user: User): Promise<void> {
    return this.afstore
    .collection('users')
    .doc(user.uid)
    .set(user.deserialize());
  }

  private getUser(uid: string): Observable<any> {
    return this.afstore
    .collection('users')
    .doc(uid)
    .valueChanges()
    .pipe(
      take(1),
      switchMap((user: any) => {
        if (user) {
          return of(new User(uid, user.name));
        } else {
          return of(null);
        }
      })
    );
  }

 checkLogin(): void {
  this.afAuth
    .authState
    .pipe(
      // authの有無でObservableを変更
      switchMap((auth: any)  => {
        if (!auth) {
          return of(null);
        } else {
          return this.getUser(auth.uid);
        }
      })
    )
    .subscribe((user: User | null) => {
      this.session.isLogin = (!!user);
      this.session.user = (user) ? user : new User();
      this.sessionSubject.next(this.session);
    });
}

  checkLoginState(): Observable<Session> {
    return this.afAuth
    .authState
    .pipe(
      map(auth => {
        this.session.isLogin = (!!auth);
        return this.session;
      })
    )
  }



}
