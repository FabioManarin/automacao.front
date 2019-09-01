import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { HistoricoProvider } from '../../providers/historico/historico';


@IonicPage()
@Component({
  selector: 'page-arCondicionadoPage',
  templateUrl: 'ar-condicionado.html',
})
export class ArCondicionadoPage {
  isCheckVentilador: boolean = false;
  isCheckAutomatico: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial) {
  }

  home(): void {
    this.navCtrl.setRoot('HomePage');
  }

  ventilador(event){
    if(event.checked) {
      this.bluetoothSerial.write('V1');
    } else {
      this.bluetoothSerial.write('V0');
    }
  }

  ventiladorAutomatico(event){
    if(event.checked) {
      this.bluetoothSerial.write('VA1');
    } else {
      this.bluetoothSerial.write('VA0');
    }
  }
}
