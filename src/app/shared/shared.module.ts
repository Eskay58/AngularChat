import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PipeDatePipe } from "./pipe/pipe-date.pipe"; // 追加

@NgModule({
  exports: [ 
    PipeDatePipe,
    FormsModule,
  ],
  imports: [
    FormsModule,
  ],
  declarations: [ 
    PipeDatePipe
  ]
})
export class SharedModule { }