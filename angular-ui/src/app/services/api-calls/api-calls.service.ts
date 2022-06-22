import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AbstractHttpService } from '../abstract-http.service';
import { Router } from '@angular/router';
import { SharedService } from '../sharedService';
import { Observable } from 'rxjs';
import { HttpRequestArgsService } from '../http-request-args.service';
import { BackendService } from 'src/app/BackendServices';
import { Login } from 'src/app/model/Login';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*'
  });
  httpRequest = new HttpRequestArgsService();

  constructor(private abstractHttpService: AbstractHttpService, private router: Router, private sharedService: SharedService) { }

  setHeader(): void {
    this.headers = new HttpHeaders({ token: this.sharedService.token, 'Content-Type': 'application/json' });
  }

  public login(login: Login): Observable<any> {
    this.httpRequest.url = BackendService.authenticate;
    this.httpRequest.headers = this.headers;
    return this.abstractHttpService.post$(this.httpRequest, login);
  }

  public masters(): Observable<any> {
    this.httpRequest.url = BackendService.serviceUrl + 'masters';
    this.setHeader();
    this.httpRequest.headers = this.headers;
    return this.abstractHttpService.get$(this.httpRequest);
  }

  public register(register: User): Observable<any> {
    this.httpRequest.url = BackendService.register;
    this.httpRequest.headers = this.headers;
    return this.abstractHttpService.post$(this.httpRequest, register);
  }

  public update(update: User): Observable<any> {
    this.httpRequest.url = BackendService.users + update._id;
    this.setHeader();
    this.httpRequest.headers = this.headers;
    return this.abstractHttpService.put$(this.httpRequest, update);
  }

  public getUserById(id: any): Observable<any> {
    this.httpRequest.url = BackendService.users + id;
    this.setHeader();
    this.httpRequest.headers = this.headers;
    return this.abstractHttpService.get$(this.httpRequest);
  }

  public getUsers(): Observable<any> {
    this.httpRequest.url = BackendService.users;
    this.setHeader();
    this.httpRequest.headers = this.headers;
    return this.abstractHttpService.get$(this.httpRequest);
  }

  public updateuserphotoId(request: any): Observable<any> {
    this.httpRequest.url = BackendService.users + 'updateuserphotoId';
    this.setHeader();
    this.httpRequest.headers = this.headers;
    return this.abstractHttpService.post$(this.httpRequest, request);
  }

  public createPost(request: any): Observable<any> {
    this.httpRequest.url = BackendService.posts + 'createPost';
    this.setHeader();
    this.httpRequest.headers = this.headers;
    return this.abstractHttpService.post$(this.httpRequest, request);
  }

  public getPostByUserId(id: any): Observable<any> {
    this.httpRequest.url = BackendService.posts + 'findpostbyuserid';
    let request = { id }
    this.setHeader();
    this.httpRequest.headers = this.headers;
    return this.abstractHttpService.post$(this.httpRequest, request);
  }

  public getFriends(): Observable<any> {
    this.httpRequest.url = BackendService.friends;
    this.setHeader();
    this.httpRequest.headers = this.headers;
    return this.abstractHttpService.get$(this.httpRequest);
  }

  public createrequest(request: any): Observable<any> {
    this.httpRequest.url = BackendService.friends + 'createrequest';
    this.setHeader();
    this.httpRequest.headers = this.headers;
    return this.abstractHttpService.post$(this.httpRequest, request);
  }

  public updaterequest(request: any, id: any): Observable<any> {
    this.httpRequest.url = BackendService.friends + id;
    this.setHeader();
    this.httpRequest.headers = this.headers;
    return this.abstractHttpService.put$(this.httpRequest, request);
  }

  public changePassword(request: any): Observable<any> {
    this.httpRequest.url = BackendService.users + 'changePassword';
    this.setHeader();
    this.httpRequest.headers = this.headers;
    return this.abstractHttpService.put$(this.httpRequest, request);
  }

  public authCheck(request: any): Observable<any> {
    this.httpRequest.url = BackendService.users + 'authCheck';
    this.httpRequest.headers = this.headers;
    return this.abstractHttpService.post$(this.httpRequest, request);
  }

  

}
