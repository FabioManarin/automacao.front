import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertProvider } from '../../providers/alert/alert';


@IonicPage()
@Component({
  selector: 'page-pareamento',
  templateUrl: 'pareamento.html',
})
export class PareamentoPage {

  pairedList: pairedlist;
  listToggle: boolean = false;
  pairedDeviceID: number = 0;
  dataSend: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bluetoothSerial: BluetoothSerial,
    public alertSrv: AlertProvider) {
    this.checkBluetoothEnabled();
  }

  home(): void {
    this.navCtrl.setRoot('HomePage');
  }

  checkBluetoothEnabled() {
    this.bluetoothSerial.isEnabled().then(success => {
      this.listPairedDevices();
    }, error => {
      this.alertSrv.alert('Aviso','Por favor ative o bluetooth.');
    });
  } 

  listPairedDevices() {
    this.bluetoothSerial.list().then(success => {
      this.pairedList = success;
      this.listToggle = true;
    }, error => {
      this.alertSrv.alert('Aviso','Por favor ative o bluetooth.');
      this.listToggle = false;
    });
  }

  selectDevice() {
    let connectedDevice = this.pairedList[this.pairedDeviceID];
    if (!connectedDevice.address) {
      this.alertSrv.alert('Aviso','Selecione dispositivo emparelhado para conectar.');
      return;
    }
    let address = connectedDevice.address;
    let name = connectedDevice.name;

    this.connect(address);
  }

  connect(address) {
    // Attempt to connect device with specified address, call app.deviceConnected if success
    this.bluetoothSerial.connect(address).subscribe(success => {
      this.deviceConnected();
      this.alertSrv.alert('Aviso', 'Conectado com sucesso.');
    }, error => {
      this.alertSrv.alert('Aviso', 'Erro ao conectar o dispositivo.');
    });
  }

  deviceConnected() {
    // Subscribe to data receiving as soon as the delimiter is read
    this.bluetoothSerial.subscribe('\n').subscribe(success => {
      // this.handleData(success);
      // this.alertSrv.alert('Aviso', 'Conectado com sucesso.');
    }, error => {
      this.alertSrv.alert('Erro', error);
    });
  }

  deviceDisconnected() {
    // Unsubscribe from data receiving
    this.bluetoothSerial.disconnect();
    this.alertSrv.alert('Aviso', 'Dispositivo desconectado.');
  }

  handleData(data) {
    this.alertSrv.alert('Aviso', data);
  }
}

interface pairedlist {
  "class": number,
  "id": string,
  "address": string,
  "name": string
}
