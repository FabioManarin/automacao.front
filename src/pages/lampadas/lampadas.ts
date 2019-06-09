import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { HistoricoModel } from '../../app/models/historicoModel';
import { UsuarioModel } from '../../app/models/usuarioModel';
import { HistoricoPage } from '../historico/historico';
import { HistoricoProvider } from '../../providers/historico/historico';

@IonicPage()
@Component({
  selector: 'page-lampadas',
  templateUrl: 'lampadas.html',
})
export class LampadasPage {

  historico: HistoricoModel = new HistoricoModel();
  usuarioLogado: UsuarioModel = new UsuarioModel();
  historicoList: Array<HistoricoModel> = new Array<HistoricoModel>();
  isCheckSuite: boolean = false;
  isCheckQuarto: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private historicoSrv: HistoricoProvider) {
  }

  ionViewDidLoad() {
    this.historicoSrv.setUserLogado();
    this.getStatus();
  }

  getStatus(): void {
    this.getStatusSuite();
    this.getStatusQuarto();
  }

  async getStatusSuite(): Promise<void> {
    try {
      this.isCheckSuite = await this.historicoSrv.getStatus('Lampada suíte');
    } catch (error) {
      console.log(error);
    }
  }

  async getStatusQuarto(): Promise<void> {
    try {
      this.isCheckQuarto = await this.historicoSrv.getStatus('Lampada quarto');
    } catch (error) {
      console.log(error);
    }
  }

  home(): void {
    this.navCtrl.setRoot('HomePage');
  }

  lampadaSuite(event){
    if(event.checked) {
      this.acenderLed();
      this.historicoSrv.save('Lampada suíte', true);
    } else {
      this.apagarLed();
      this.historicoSrv.save('Lampada suíte', false);
    }
  }

  lampadaQuarto(event){
    if(event.checked) {
      this.acenderLed();
      this.historicoSrv.save('Lampada quarto', true);
    } else {
      this.apagarLed();
      this.historicoSrv.save('Lampada quarto', false);
    }
  }

  acenderLed() {
    let ledVermelho = 'L';
    this.bluetoothSerial.write(ledVermelho);
  }

  apagarLed() {
    let ledVermelho = 'D';
    this.bluetoothSerial.write(ledVermelho);
  }

}
