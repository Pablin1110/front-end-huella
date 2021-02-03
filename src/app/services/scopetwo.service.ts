import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import {DataScopetwo} from 'src/app/interfaces/data-scopetwo';
import { Scopetwo } from '../interfaces/scopetwo';
import {DataSumscopeone} from 'src/app/interfaces/data-sumscopeone';
@Injectable({
  providedIn: 'root'
})
export class ScopetwoService {

  private api: any;
  constructor(
    private env: EnvService,
    private http: HttpClient, ) {
      this.api = this.env.API_URL;
    }

    getAllScopeTwo() {
      const path = `${this.api}api/v1/getAllScopetwo`;
      return this.http.get<DataScopetwo>(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    getScopeTwo( id_user: number) {
      const path = `${this.api}api/v1/getScopetwoxID/${id_user}`;
      return this.http.get<DataScopetwo>(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    getScopeTwoInfo( id_user: number) {
      const path = `${this.api}api/v1/getScopetwoxIDInfo/${id_user}`;
      return this.http.get<DataScopetwo>(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    getSumScopeTwo( id_user: number) {
      const path = `${this.api}api/v1/getSumScopetwo/${id_user}`;
      return this.http.get <DataSumscopeone> (path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    storeScopeTwo(scopetwo: Scopetwo){
      const path = `${this.api}api/v1/postScopetwo`;
      return this.http.post(path, scopetwo, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    updateScopeTwo(scopetwo: Scopetwo){
      const path = `${this.api}api/v1/putScopetwo/${scopetwo.id}`;
      return this.http.put<Scopetwo>(path, scopetwo, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
    });
    }
    updateScopeT(scopetwo: Scopetwo, id: number) {
      return this.http.put(`${this.api}api/v1/putScopetwo/${id}`, scopetwo, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
    });
    }
    deleteScopeTwo(id: number) {
      const path = `${this.api}api/v1/deleteScopetwo/${id}`;
      return this.http.delete(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    deleteAllScopeTwo(id: number) {
      const path = `${this.api}api/v1/deleteAllScopetwo/${id}`;
      return this.http.delete(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
}
