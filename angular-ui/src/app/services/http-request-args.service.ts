import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestArgsService {
  url?: string;
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
