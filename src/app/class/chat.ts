import * as moment from 'moment';

export interface User { 
  uid: number;
  name: string;
}

 export class Comment {
  user: User;
  content: string;
  date: number;

  constructor(user: User, content: string){
    this.user = user;
    this.content = content;
    this.date = +moment();
  }
 }

 export class Session {
   private isLogin: boolean;

   constructor(){
     this.isLogin = false;
   }

   set(): Session {
     this.isLogin = true;
     return this;
   }

   reset(): Session {
     this.isLogin = false;
     return this;
   }

  get(): boolean {
    return this.isLogin;
  }

 }