import { ConfigHelper } from './../../app/helpers/configHelper';
import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/providerBase';
import { HistoricoModel } from '../../app/models/historicoModel';
import { HttpProvider } from '../http/http';
import { HttpResultModel } from '../../app/models/HttpResultModel';
import { UsuarioModel } from '../../app/models/usuarioModel';
import { UsuarioProvider } from '../usuario/usuario';

@Injectable()
export class HistoricoProvider extends ProviderBase<HistoricoModel> {

  url: string = `${ConfigHelper.Url}historico`;
  historicoList: Array<HistoricoModel> = new Array<HistoricoModel>();
  historico: HistoricoModel = new HistoricoModel();
  usuarioLogado: UsuarioModel = new UsuarioModel();

  constructor(public http: HttpProvider, private usuarioSrv: UsuarioProvider) {
    super(`${ConfigHelper.Url}historico`, http);
  }

  async saveHistorico(historico: HistoricoModel): Promise<HttpResultModel> {
    return this.http.postHistorico(`${this.url}/save`, historico);
  }

  async getAllHistorico(): Promise<HttpResultModel> {
    return this.http.getHistorico(`${this.url}/`);
  }

  async getAll(): Promise<HttpResultModel> {
    return this.http.get(`${this.url}/`);
  }

  async save(eletronico: string, ativo: boolean): Promise<void> {
    this.historico.ativo = ativo;
    this.historico.eletronico = eletronico;
    this.historico.usuario = this.usuarioLogado.nome;
    try {
      await this.saveHistorico(this.historico);
    } catch (error) {
      console.log('Problema ao registrar histórico.');
    }
  }

  async setUserLogado(): Promise<void> {
    try {
      let user = <UsuarioModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.user))
      let userResult = await this.usuarioSrv.getByUid(user._id);
      if (userResult.success) {
        this.usuarioLogado = <UsuarioModel>userResult.data;
      }
    } catch (error) {
      console.log('Problema ao carregar os dados do usuário');
    }
  }

  async getStatus(eletronico: string): Promise<boolean> {
    try {
        let historicoResult = await this.getAll();
        if (historicoResult.success) {
          this.historicoList = <Array<HistoricoModel>>historicoResult.data;
          let historicoFilter = this.historicoList.filter(name => name.eletronico.startsWith(eletronico));
          let historicoOrder = historicoFilter.filter(name => name.dataCriacao).reverse();
          let ultimoStatus = historicoOrder[0].ativo;
          return ultimoStatus;
        }
    } catch (error) {
        console.log('Problema ao setar status', error);
    }
  }

}



