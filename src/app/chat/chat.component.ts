import { Component, OnInit } from '@angular/core';
import { Comment, User } from '../class/chat';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public content: string = '';

  currentUser: User = { uid: 1, name: 'Kotaki Seiya' };
  anotherUser: User = { uid: 2, name: 'Suzuki Taro' };
  comments: Comment[] = [
    new Comment(this.anotherUser, 'Suzukiの１つ目のコメントです。'),
    new Comment(this.anotherUser, 'Suzukiの2つ目のコメントです。'),
    new Comment(this.currentUser, 'Kotakiの１つ目のコメントです。'),
    new Comment(this.anotherUser, 'Suzukiの3つ目のコメントです。'),
    new Comment(this.currentUser, 'Kotakiの2つ目のコメントです。'),
  ] 

  constructor() { }

  ngOnInit(): void {
  }

  addComment(content: string) {
    if(content){
      this.comments.push(new Comment(this.currentUser, content));
      this.content = '';
    }
  }

}
