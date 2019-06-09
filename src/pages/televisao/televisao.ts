import { AlertProvider } from './../../providers/alert/alert';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoricoModel } from '../../app/models/historicoModel';
import { UsuarioModel } from '../../app/models/usuarioModel';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { HistoricoProvider } from '../../providers/historico/historico';


@IonicPage()
@Component({
  selector: 'page-televisao',
  templateUrl: 'televisao.html',
})
export class TelevisaoPage {

  historico: HistoricoModel = new HistoricoModel();
  usuarioLogado: UsuarioModel = new UsuarioModel();
  historicoList: Array<HistoricoModel> = new Array<HistoricoModel>();
  isCheckSuite: boolean = false;
  isCheckQuarto: boolean = false;
  isCheckSala: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial,
    private historicoSrv: HistoricoProvider) {
  }

  home(): void {
    this.navCtrl.setRoot('HomePage');
  }

  ionViewDidLoad() {
    this.historicoSrv.setUserLogado();
    this.getStatus();
  }

  getStatus(): void {
    this.getStatusSuite();
    this.getStatusQuarto();
    this.getStatusSala();
  }

  async getStatusSuite(): Promise<void> {
    try {
      this.isCheckSuite = await this.historicoSrv.getStatus('Televisão suíte');
    } catch (error) {
      console.log(error);
    }
  }

  async getStatusQuarto(): Promise<void> {
    try {
      this.isCheckQuarto = await this.historicoSrv.getStatus('Televisão quarto');
    } catch (error) {
      console.log(error);
    }
  }

  async getStatusSala(): Promise<void> {
    try {
      this.isCheckSala = await this.historicoSrv.getStatus('Televisão sala');
    } catch (error) {
      console.log(error);
    }
  }

  tvSuite(event){
    let nome = 'Televisão suíte';
    if(event.checked) {
      this.ligarTv();
      this.historicoSrv.save(nome, true);
    } else {
      this.desligarTv();
      this.historicoSrv.save(nome, false);
    }
  }

  tvQuarto(event){
    let nome = 'Televisão quarto';
    if(event.checked) {
      this.ligarTv();
      this.historicoSrv.save(nome, true);
    } else {
      this.desligarTv();
      this.historicoSrv.save(nome, false);
    }
  }

  tvSala(event){
    let nome = 'Televisão sala';
    if(event.checked) {
      this.ligarTv();
      this.historicoSrv.save(nome, true);
    } else {
      this.desligarTv();
      this.historicoSrv.save(nome, false);
    }
  }

  ligarTv() {
    this.bluetoothSerial.write('TL');
  }

  desligarTv() {
    this.bluetoothSerial.write('TD');
  }
}
