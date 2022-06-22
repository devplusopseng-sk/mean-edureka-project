import { environment } from './../environments/environment';

export class BackendService {
  constructor() {
    console.log(`API ${environment.api} | Version : ${environment.VERSION} `);
  }

  public static serviceUrl = environment.api;
  public static register = BackendService.serviceUrl + 'users/register';
  public static authenticate = BackendService.serviceUrl + 'users/authenticate';
  public static users = BackendService.serviceUrl + 'users/';
  public static posts = BackendService.serviceUrl + 'posts/';
  public static friends = BackendService.serviceUrl + 'friends/';
}
