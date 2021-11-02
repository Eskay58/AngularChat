import { Component } from '@angular/core';
import { Comment, User } from './class/chat'; 
import { SessionService } from './service/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(sessionSerivice: SessionService) {
    // ルートコンポーネントはどのページに遷移しても読み込まれるため
    // 認証確認はここで行う
    sessionSerivice.checkLogin();
  }

}
