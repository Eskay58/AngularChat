import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/class/chat';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  account: Account = new Account();

  constructor(private sessionSerivice: SessionService) { }

  ngOnInit(): void {
  }

  submitLogin() {
    this.sessionSerivice.login(this.account);
  }

}
