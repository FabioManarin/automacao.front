import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoricoProvider } from '../../providers/historico/historico';
import { HistoricoModel } from '../../app/models/historicoModel';
import { UsuarioModel } from '../../app/models/usuarioModel';

@IonicPage()
@Component({
    selector: 'page-historico',
    templateUrl: 'historico.html',
})

@Injectable()
export class HistoricoPage {

    historico: Array<HistoricoModel> = new Array<HistoricoModel>();
    usuarioLogado: UsuarioModel = new UsuarioModel();

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private historicoSrv: HistoricoProvider) {
    }

    ionViewDidLoad() {
        this.getAll();
    }

    home(): void {
        this.navCtrl.setRoot('HomePage');
    }

    async getAll(): Promise<void> {
        try {
            let historicoResult = await this.historicoSrv.getAllHistorico();
            if (historicoResult.success) {
                this.historico = <Array<HistoricoModel>>historicoResult.data;
                this.historico = this.historico.filter(name => name.dataCriacao).reverse();
                this.historico.length = 50;
            }
        } catch (error) {
            console.log('problema ao carregar o histórico', error);
        }
    }
}
