import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { HistoricoModel } from '../../app/models/historicoModel';
import { UsuarioModel } from '../../app/models/usuarioModel';
import { HistoricoPage } from '../historico/historico';
import { HistoricoProvider } from '../../providers/historico/historico';

@IonicPage()
@Component({
  selector: 'page-cortinas',
  templateUrl: 'cortinas.html',
})
export class CortinasPage {

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
      this.isCheckSuite = await this.historicoSrv.getStatus('Cortina suíte');
    } catch (error) {
      console.log(error);
    }
  }

  async getStatusQuarto(): Promise<void> {
    try {
      this.isCheckQuarto = await this.historicoSrv.getStatus('Cortina quarto');
    } catch (error) {
      console.log(error);
    }
  }

  home(): void {
    this.navCtrl.setRoot('HomePage');
  }

  cortinaSuite(event){
    if(event.checked) {
      this.abrirCortina();
      this.historicoSrv.save('Cortina suíte', true);
    } else {
      this.feharCortina();
      this.historicoSrv.save('Cortina suíte', false);
    }
  }

  cortinaQuarto(event){
    if(event.checked) {
      this.abrirCortina();
      this.historicoSrv.save('Cortina quarto', true);
    } else {
      this.feharCortina();
      this.historicoSrv.save('Cortina quarto', false);
    }
  }

  abrirCortina() {
    let ledVermelho = 'AC';
    this.bluetoothSerial.write(ledVermelho);
  }

  feharCortina() {
    let ledVermelho = 'FC';
    this.bluetoothSerial.write(ledVermelho);
  }

}
