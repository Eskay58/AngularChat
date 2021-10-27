import { NgModule } from '@angular/core';
import { PipeDatePipe } from "./pipe/pipe-date.pipe"; // 追加

@NgModule({
  exports: [ 
    PipeDatePipe,
  ],
  declarations: [ 
    PipeDatePipe
  ]
})
export class SharedModule { }