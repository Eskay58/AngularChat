import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // 追加
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // 追加

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HeaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
