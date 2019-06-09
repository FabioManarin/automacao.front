import { AlertProvider } from './../../providers/alert/alert';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { HistoricoProvider } from '../../providers/historico/historico';
import { HistoricoModel } from '../../app/models/historicoModel';
import { UsuarioModel } from '../../app/models/usuarioModel';


@IonicPage()
@Component({
  selector: 'page-arCondicionadoPage',
  templateUrl: 'ar-condicionado.html',
})
export class ArCondicionadoPage {

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
      this.isCheckSuite = await this.historicoSrv.getStatus('Arcondicionado suíte');
    } catch (error) {
      console.log(error);
    }
  }

  async getStatusQuarto(): Promise<void> {
    try {
      this.isCheckQuarto = await this.historicoSrv.getStatus('Arcondicionado quarto');
    } catch (error) {
      console.log(error);
    }
  }

  async getStatusSala(): Promise<void> {
    try {
      this.isCheckSala = await this.historicoSrv.getStatus('Arcondicionado sala');
    } catch (error) {
      console.log(error);
    }
  }

  arSuite(event){
    let nome = 'Arcondicionado suíte';
    if(event.checked) {
      this.ligarAr();
      this.historicoSrv.save(nome, true);
    } else {
      this.desligarAr();
      this.historicoSrv.save(nome, false);
    }
  }

  arQuarto(event){
    let nome = 'Arcondicionado quarto';
    if(event.checked) {
      this.ligarAr();
      this.historicoSrv.save(nome, true);
    } else {
      this.desligarAr();
      this.historicoSrv.save(nome, false);
    }
  }

  arSala(event){
    let nome = 'Arcondicionado sala';
    if(event.checked) {
      this.ligarAr();
      this.historicoSrv.save(nome, true);
    } else {
      this.desligarAr();
      this.historicoSrv.save(nome, false);
    }
  }

  ligarAr() {
    this.bluetoothSerial.write('AL');
  }

  desligarAr() {
    this.bluetoothSerial.write('AD');
  }
}
