import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TelevisaoPage } from './televisao';

@NgModule({
  declarations: [
    TelevisaoPage,
  ],
  imports: [
    IonicPageModule.forChild(TelevisaoPage),
  ],
})
export class TelevisaoPageModule {}
