import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment, User } from '../class/chat';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public items: Observable<Comment[]>;
  public content: string = '';
  // currentUser: User = new User("1", 'Kotaki Seiya');
  // public anotherUser: User = new User("2", 'Suzuki Taro');

  currentUser!: User;

  // comments: Comment[] = [
  //   new Comment(this.anotherUser, 'Suzukiの１つ目のコメントです。'),
  //   new Comment(this.anotherUser, 'Suzukiの2つ目のコメントです。'),
  //   new Comment(this.currentUser!, 'Kotakiの１つ目のコメントです。'),
  //   new Comment(this.anotherUser, 'Suzukiの3つ目のコメントです。'),
  //   new Comment(this.currentUser!, 'Kotakiの2つ目のコメントです。'),
  // ] 

  constructor(
    private db: AngularFirestore,
    private sessionService: SessionService,
    ) { 

      sessionService.sessionState
      .subscribe(data => {
        this.currentUser = data.user;
      })

      this.items = db
        .collection<Comment>('comments', ref => {
          return ref.orderBy('date', 'asc');
        })
        .snapshotChanges()
        .pipe(
          // actionsから新たなストリームを作成する
          map(actions => {
            // actionの配列からコメントのデータを抽出し新たな配列を作成する
            return actions.map(action => {
              const data = action.payload.doc.data() as Comment;
              const commentData = new Comment(data.user, data.content);
              commentData.setDate(data.date);
              return commentData;
            })
          })
        )
      }

      // this.items = db
      //   .collection<Comment>('comments', ref => {
      //     return ref.orderBy('date', 'asc');
      //   })
      //   .valueChanges();
      // }
   
  ngOnInit(): void {
    this.items.subscribe
  }

  addComment(comment: string) {
    if (comment) {
      this.db
        .collection('comments')
        .add(new Comment(this.currentUser!, comment).deserialize()); 
      this.content = '';
      this.db
      .collection('users')
      .doc('uid')
      .set(new User('uid', 'amano').deserialize());
    }
  }

}