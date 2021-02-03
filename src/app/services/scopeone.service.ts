import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import {DataScopeone} from 'src/app/interfaces/data-scopeone';
import {DataSumscopeone} from 'src/app/interfaces/data-sumscopeone';
import { Scopeone } from '../interfaces/scopeone';

@Injectable({
  providedIn: 'root'
})
export class ScopeoneService {

  private api: any;
  constructor(
    private env: EnvService,
    private http: HttpClient, ) {
      this.api = this.env.API_URL;
    }
    getAllScopeOne() {
      const path = `${this.api}api/v1/getAllScopeone`;
      return this.http.get<DataScopeone>(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    getScopeOne( id_user: number) {
      const path = `${this.api}api/v1/getScopeonexID/${id_user}`;
      return this.http.get<DataScopeone>(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    getScopeOneInfo( id_user: number) {
      const path = `${this.api}api/v1/getScopeonexIDInfo/${id_user}`;
      return this.http.get<DataScopeone>(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    getSumScopeOne( id_user: number) {
      const path = `${this.api}api/v1/getSumScopeone/${id_user}`;
      return this.http.get <DataSumscopeone> (path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    storeScopeOne(scopeone: Scopeone){
      const path = `${this.api}api/v1/postScopeone`;
      return this.http.post(path, scopeone, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    updateScopeOne(scopeone: Scopeone){
      const path = `${this.api}api/v1/putScopeone/${scopeone.id}`;
      return this.http.put<Scopeone>(path, scopeone, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
    });
    }
    updateScopeO(scopeone: Scopeone, id: number) {
      return this.http.put(`${this.api}api/v1/putScopeone/${id}`, scopeone, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
    });
    }
    deleteScopeOne(id: number) {
      const path = `${this.api}api/v1/deleteScopeone/${id}`;
      return this.http.delete(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    deleteAllScopeOne(id: number) {
      const path = `${this.api}api/v1/deleteAllScopeone/${id}`;
      return this.http.delete(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }


}
