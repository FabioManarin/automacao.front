import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  lampadas(): void {
    this.navCtrl.setRoot('LampadasPage');
  }

  alarme(): void {
    this.navCtrl.setRoot('AlarmePage');
  }

  arCondicionado(): void {
    this.navCtrl.setRoot('ArCondicionadoPage');
  }

  televisao(): void {
    this.navCtrl.setRoot('TelevisaoPage');
  }
  
  portao(): void {
    this.navCtrl.setRoot('PortaoPage');
  }

  // pareamento(): void {
  //   this.navCtrl.setRoot('PareamentoPage');
  // }

  // exit(): void {
  //   this.navCtrl.setRoot('LoginPage');
  // }
}
