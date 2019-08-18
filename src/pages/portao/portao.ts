// import { AlertProvider } from './../../providers/alert/alert';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { HistoricoModel } from '../../app/models/historicoModel';
// import { UsuarioModel } from '../../app/models/usuarioModel';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { HistoricoProvider } from '../../providers/historico/historico';


@IonicPage()
@Component({
  selector: 'page-portao',
  templateUrl: 'portao.html',
})
export class PortaoPage {

  // historico: HistoricoModel = new HistoricoModel();
  // usuarioLogado: UsuarioModel = new UsuarioModel();
  // historicoList: Array<HistoricoModel> = new Array<HistoricoModel>();
  isCheckGaragem: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private historicoSrv: HistoricoProvider) {
  }

  // ionViewDidLoad() {
  //   this.historicoSrv.setUserLogado();
  //   this.getStatus();
  // }

  // getStatus(): void {
  //   this.getStatusFachada();
  //   this.getStatusGaragem();
  // }

  // async getStatusFachada(): Promise<void> {
  //   try {
  //     this.isCheckFachada = await this.historicoSrv.getStatus('Portão fachada');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async getStatusGaragem(): Promise<void> {
  //   try {
  //     this.isCheckGaragem = await this.historicoSrv.getStatus('Portão garagem');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  home(): void {
    this.navCtrl.setRoot('HomePage');
  }

  portaoGaragem(event){
    if(event.checked) {
      this.bluetoothSerial.write('P1');
    } else {
      this.bluetoothSerial.write('P0');
    }
  }
}
