import { Component, OnInit } from '@angular/core';
import { Session } from '../class/chat';

import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login: boolean;
  userName: string = 'guest';

  constructor(
    private sessionService: SessionService,
  ) { 
    this.login = false;
   }

  ngOnInit(): void {
    this.sessionService.sessionState.subscribe((session: Session) => {
      if(session){
        this.login = session.isLogin;
        this.userName = session.user.name;
      }
    });
    
  }

  logout() {
    this.sessionService.logout();
  }
  
}
