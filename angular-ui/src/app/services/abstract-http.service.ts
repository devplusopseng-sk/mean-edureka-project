import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
// import 'rxjs/add/observable/throw';
import { HttpRequestArgsService } from '../services/http-request-args.service';
// import 'rxjs/add/operator/timeout';
import { SharedService } from './sharedService';
import { ErrorServiceService } from '../util/error/error-service.service';

@Injectable({
  providedIn: 'root'
})
export class AbstractHttpService {

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private router: Router,
              private sharedService: SharedService, private errorService: ErrorServiceService, ) { }

  public get$(request: any) {
    this.sharedService.loading = true;
    return this.http.get(request.url, { headers: request.headers, observe: 'response' }).pipe(timeout(60000),
      tap(res => {
        this.sharedService.loading = false;
      }),
      catchError(error =>
        this.handleError(error, request.url)

      )
    );
  }

  public post$(request: any, body: any) {
    this.sharedService.loading = true;
    return this.http.post(request.url, body, { headers: request.headers, observe: 'response' }).pipe(timeout(60000),     // 60 Second
      tap(res => {
        this.sharedService.loading = false;
      }),
      catchError(error =>
        this.handleError(error, request.url)

      ),
    );
  }

  public put$(request: any, body: any) {
    this.sharedService.loading = true;
    return this.http.put(request.url, body, { headers: request.headers, observe: 'response' }).pipe(timeout(60000),     // 60 Second
      tap(res => {
        this.sharedService.loading = false;
      }),
      catchError(error =>
        this.handleError(error, request.url)

      ),
    );
  }

  public delete$(request: any) {
    this.sharedService.loading = true;
    return this.http.delete(request.url, { headers: request.headers, observe: 'response' }).pipe(timeout(60000),
      tap(res => {
        this.sharedService.loading = false;
      }),
      catchError(error =>
        this.handleError(error, request.url)

      )
    );
  }

  public postNoLoading$(request: any, body: any) {
    return this.http.post(request.url, body, { headers: request.headers, observe: 'response' }).pipe(timeout(60000),     // 60 Second
      tap(res => {
      }),
      catchError(error =>
        this.handleError(error, request.url)

      ),
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError(error: Response | any, operation = 'operation') {

    console.log('Handle Error... ');
    this.sharedService.loading = false;
    console.log(error);
    let errMsg: string;

    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.statusText} `;
      console.log(errMsg);
    } else {
      errMsg = error.message ? error.message : error.toString();
      console.log(errMsg);
    }

    if (error.status === 0) {
      if (this.router.url.indexOf('login') !== -1) {
        alert('Site is under maintanance, please visit later.');
      }
    } else if (error.status === 401) {
      console.log('Inside error', error.status);
      if (['EXPIRED TOKEN', 'INVALID TOKEN'].includes(error.error.message)) {
        if (this.router.url.indexOf('login') === -1) {
          const doLogin = confirm('User session expired or session invalid, please login again.');
          if (doLogin) {
            this.router.navigateByUrl('/login');
            sessionStorage.removeItem('currentUser');
            this.sharedService.clear();
          }
        }
      } else {
        window.scrollTo(0, 0);
        this.errorService.addError({ msg: error.error.message, type: 'danger', closable: true });
      }
    } else if (error.status === 400 || error.status === 403 || error.status === 404 || error.status === 410 || error.status === 415) {
      window.scrollTo(0, 0);
      this.errorService.addError({ msg: error.error.message, type: 'danger', closable: true });
    } else if (error.status === 500 || error.status === 502 || error.status === 503) {
      console.log('Inside error', error.status);
      window.scrollTo(0, 0);
      this.errorService.addError({
        msg: 'Currently we are experiencing technical issues. Please try after sometime.',
        type: 'danger', closable: true
      });
    }
    console.error(`Operation ${operation} ` + errMsg);
    if (error.message === 'Timeout has occurred') {
      window.scrollTo(0, 0);
      this.errorService.addError({
        msg: 'Currently we are experiencing technical issues. Please try after sometime.',
        type: 'danger', closable: true
      });
    }
    return throwError(error);
  }
}
