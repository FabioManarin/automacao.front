import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@IonicPage()
@Component({
  selector: 'page-lampadas',
  templateUrl: 'lampadas.html',
})
export class LampadasPage {
  isCheckGaragem: boolean = false;
  isCheckQuarto: boolean = false;
  isCheckCozinha: boolean = false;
  isCheckSala: boolean = false;
  isCheckAutomatica: boolean = false;
  isCheckTodasLampadas: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial) {
  }

  home(): void {
    this.navCtrl.setRoot('HomePage');
  }

  lampadaGaragem(event){
    if(event.checked) {
      this.bluetoothSerial.write('LS1');
    } else {
      this.bluetoothSerial.write('LS0');
    }
  }

  lampadaQuarto(event){
    if(event.checked) {
      this.bluetoothSerial.write('LQ1');
    } else {
      this.bluetoothSerial.write('LQ0');
    }
  }

  lampadaSala(event){
    if(event.checked) {
      this.bluetoothSerial.write('LL1');
    } else {
      this.bluetoothSerial.write('LL0');
    }
  }

  lampadaCozinha(event){
    if(event.checked) {
      this.bluetoothSerial.write('LC1');
    } else {
      this.bluetoothSerial.write('LC0');
    }
  }

  automatica(event){
    if(event.checked) {
      this.bluetoothSerial.write('A1');
    } else {
      this.bluetoothSerial.write('A0');
    }
  }

  todasLampadas(event){
    if(event.checked) {
      this.bluetoothSerial.write('BL1');
    } else {
      this.bluetoothSerial.write('BL0');
    }
  }
}
