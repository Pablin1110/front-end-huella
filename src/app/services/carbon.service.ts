import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import {DataCarbon} from 'src/app/interfaces/data-carbon';
import { Carbon } from '../interfaces/carbon';
import {DataCarbonscope} from 'src/app/interfaces/data-carbonscope';

@Injectable({
  providedIn: 'root'
})
export class CarbonService {

  private api: any;
  constructor(
    private env: EnvService,
    private http: HttpClient, ) {
      this.api = this.env.API_URL;
    }

    getAllFoot() {
      const path = `${this.api}api/v1/getAllFoot`;
      return this.http.get<DataCarbon>(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    getFoot( id_user: number) {
      const path = `${this.api}api/v1/getFootxID/${id_user}`;
      return this.http.get<DataCarbon>(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    getFootID( id_user: string) {
      const path = `${this.api}api/v1/getFootID/${id_user}`;
      return this.http.get<DataCarbon>(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    getFootIDInfo( id_user: number) {
      const path = `${this.api}api/v1/getFootIDInfo/${id_user}`;
      return this.http.get<DataCarbon>(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    getCarbonScope( id_user: number) {
      const path = `${this.api}api/v1/getScopeoneCarbon/${id_user}`;
      return this.http.get <DataCarbonscope> (path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    storeFoot(usuario_id: number, alcance_uno: number, alcance_dos: number){
      const path = `${this.api}api/v1/postFoot`;
      return this.http.post(path, {usuario_id: usuario_id, alcance_uno: alcance_uno, alcance_dos: alcance_dos}, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    updateFoot(foot: Carbon){
      const path = `${this.api}api/v1/putFoot/${foot.id}`;
      return this.http.put<Carbon>(path, foot, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
    });
    }
    updateFootC(alcance_uno: number, alcance_dos: number, id: number) {
      return this.http.put(`${this.api}api/v1/putFoot/${id}`, { alcance_uno: alcance_uno, alcance_dos: alcance_dos}, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
    });
    }
    deleteFoot(id: number) {
      const path = `${this.api}api/v1/deleteFoot/${id}`;
      return this.http.delete(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    
}
