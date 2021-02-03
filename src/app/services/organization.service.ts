import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import {Organization} from 'src/app/interfaces/organization';
import { HttpClient } from '@angular/common/http';
import {DataOrganization} from 'src/app/interfaces/data-organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private api: any;
  constructor(
    private env: EnvService,
    private http: HttpClient, ) {
      this.api = this.env.API_URL;
    }

    getAllOrganization() {
      const path = `${this.api}api/v1/getAllOrganization`;
      return this.http.get<DataOrganization>(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }

    getOrganization( id_user: string) {
      const path = `${this.api}api/v1/getOrganizationxID/${id_user}`;
      return this.http.get<DataOrganization>(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    storeOrganization(organization: Organization){
      const path = `${this.api}api/v1/postOrganization`;
      return this.http.post(path, organization, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }
    updateOrganization(organization: Organization){
      const path = `${this.api}api/v1/putOrganization/${organization.id}`;
      return this.http.put<Organization>(path, organization, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
    });
    }
    updateOrg(organization: Organization, id: number) {
      return this.http.put(`${this.api}api/v1/putOrganization/${id}`, organization, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
    });
    }
    deleteOrganization(id: number) {
      const path = `${this.api}api/v1/deleteOrganization/${id}`;
      return this.http.delete(path, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
    }

}
