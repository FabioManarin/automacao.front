// import { AlertProvider } from './../../providers/alert/alert';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { HistoricoProvider } from '../../providers/historico/historico';
// import { HistoricoModel } from '../../app/models/historicoModel';
// import { UsuarioModel } from '../../app/models/usuarioModel';


@IonicPage()
@Component({
  selector: 'page-alarme',
  templateUrl: 'alarme.html',
})
export class AlarmePage {

  // historico: HistoricoModel = new HistoricoModel();
  // usuarioLogado: UsuarioModel = new UsuarioModel();
  // historicoList: Array<HistoricoModel> = new Array<HistoricoModel>();
  isCheckInterno: boolean = false;
  isCheckExterno: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private historicoSrv: HistoricoProvider) {
  }

  home(): void {
    this.navCtrl.setRoot('HomePage');
  }

  // ionViewDidLoad() {
  //   this.historicoSrv.setUserLogado();
  //   this.getStatus();
  // }

  // getStatus(): void {
  //   this.getStatusExterno();
  //   this.getStatusInterno();
  // }

  // async getStatusExterno(): Promise<void> {
  //   try {
  //     this.isCheckExterno = await this.historicoSrv.getStatus('Alarme externo');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async getStatusInterno(): Promise<void> {
  //   try {
  //     this.isCheckInterno = await this.historicoSrv.getStatus('Alarme interno');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  ligarAlarme(event){
    if(event.checked) {
      this.bluetoothSerial.write('S1');
    } else {
      this.bluetoothSerial.write('S0');
    }
  }

  dispararAlarme(event){
    if(event.checked) {
      this.bluetoothSerial.write('SP1');
    } else {
      this.bluetoothSerial.write('SP0');
    }
  }
}
