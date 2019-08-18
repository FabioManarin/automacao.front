import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
// import { HistoricoModel } from '../../app/models/historicoModel';
// import { UsuarioModel } from '../../app/models/usuarioModel';
// import { HistoricoPage } from '../historico/historico';
// import { HistoricoProvider } from '../../providers/historico/historico';

@IonicPage()
@Component({
  selector: 'page-lampadas',
  templateUrl: 'lampadas.html',
})
export class LampadasPage {

  // historico: HistoricoModel = new HistoricoModel();
  // usuarioLogado: UsuarioModel = new UsuarioModel();
  // historicoList: Array<HistoricoModel> = new Array<HistoricoModel>();
  isCheckSuite: boolean = false;
  isCheckQuarto: boolean = false;
  isCheckAutomatica: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial) {
  }

  home(): void {
    this.navCtrl.setRoot('HomePage');
  }

  lampadaSuite(event){
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

  automatica(event){
    if(event.checked) {
      this.bluetoothSerial.write('A1');
    } else {
      this.bluetoothSerial.write('A0');
    }
  }
}
