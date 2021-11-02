import * as moment from 'moment';

export class User {
  uid: string;
  name: string;
  
  constructor(uid?: string, name?: string) {
    this.uid = (uid) ? uid : '';
    this.name = (name) ? name : '';
  }

  deserialize() {
    return Object.assign({}, this);
  }

}

export class Comment {
  user: User;
  content: string;
  date: number;

  constructor(user: User, content: string) {
    this.user = user;
    this.content = content;
    this.date = +moment();
  }

  deserialize() {
    this.user = this.user.deserialize();
    return Object.assign({}, this);
  }

  setDate(date: number) {
    this.date = date;
    return this;
  }

}

export class Session {
  public isLogin: boolean;
  public user: User;

  constructor(){
    this.isLogin = false;
    this.user = new User();
  }

  setSession(): Session {
    this.isLogin = true;
    return this;
  }

  reset(): Session {
    this.isLogin = false;
    this.user = new User();
    return this;
  }

  getLogin(): boolean {
    return this.isLogin;
  }

}

export class Account {
  name                : string;
  email               : string;
  password            : string;
  passwordConfirmation: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.password  = '';
    this.passwordConfirmation = '';
  }

  reset() {
    this.name = '';
    this.email = '';
    this.password  = '';
    this.passwordConfirmation = '';
  }

}

export class hoge {
  place = {
    shirube: 1,
    gameCenter: 1,

  }
  task = {
    reserve: 0,
    // important
    nextPromise: 1,
    comeHouseTalk:1,

    takePhoto: 1,
    shakeHands: 1,
   }
   talkAbout = {
    tripYear: 0,
    xday: 0,
    newJob: 0,
    houseTime: 0,
   }
   carefull = {
    beKind : 0,
    friendly: 0,
    strongMan : 0,
    makeSmile: 0,
   }
}