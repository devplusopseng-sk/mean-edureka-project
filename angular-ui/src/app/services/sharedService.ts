import { Injectable } from '@angular/core';
import { AuthDetails } from '../model/AuthDetails';

@Injectable()
export class SharedService {
  public loading = false;
  public token: any;
  public authDetails!: AuthDetails;
  public ppMasters: any;

  constructor() {
    if (sessionStorage.getItem('currentUser') && sessionStorage.getItem('temp')) {
      const shared: SharedService = JSON.parse(window.atob(sessionStorage.getItem('temp')!));
      for (const key in shared) {
        if (shared.hasOwnProperty(key)) {
          // this[key] = shared[key];
          (this as any)[key] = (shared as any)[key]; // copies each property to the objCopy object
        }
      }
      sessionStorage.removeItem('temp');
    }
  }

  clear(): void {
    console.log('Inside clear');
    this.token = '';
    this.authDetails = new AuthDetails();
  }
}
