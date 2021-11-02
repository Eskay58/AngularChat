import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/class/chat';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  account: Account;

  constructor(private session: SessionService) { 
    this.account = new Account();
  }

  ngOnInit(): void {
  }

  submitSignUp() {
    if(this.account.password !== this.account.passwordConfirmation) {
      alert('パスワードが異なります');      
      return;
    }
    this.session.signup(this.account);

  }

}
