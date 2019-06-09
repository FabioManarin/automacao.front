import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LampadasPage } from './lampadas';

@NgModule({
  declarations: [
    LampadasPage,
  ],
  imports: [
    IonicPageModule.forChild(LampadasPage),
  ],
})
export class LampadasPageModule {}
