import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/model/Login';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/sharedService';
import { ErrorServiceService } from 'src/app/util/error/error-service.service';
import { ApiCallsService } from 'src/app/services/api-calls/api-calls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();

  constructor(
    private router: Router,
    public sharedService: SharedService,
    private errorService: ErrorServiceService,
    private apiCalls: ApiCallsService
  ) { }

  ngOnInit(): void {
    this.sharedService.clear();
  }

  submitLogin() {
    console.log('Inside submitLogin');
    if (this.login.email !== null && this.login.password !== null) {
      this.apiCalls.login(this.login).subscribe(
        res => {
          console.log(res);
          const resp = JSON.parse(JSON.stringify(res));
          if (resp.status === 200) {
            sessionStorage.setItem('currentUser', JSON.stringify('userPresent'));
            this.sharedService.token = resp.body.token;
            this.sharedService.authDetails = resp.body;
            this.getMasters();
            this.router.navigateByUrl('/home');
          }
        },
        error => {

        }
      );
    } else {
      this.errorService.addError({
        msg: 'Please enter a valid email and Password.',
        type: 'danger', closable: true
      });
    }
  }

  getMasters() {
    console.log('Inside getMasters');
      this.apiCalls.masters().subscribe(
        res => {
          console.log(res);
          const resp = JSON.parse(JSON.stringify(res));
          if (resp.status === 200) {
            this.sharedService.ppMasters = resp.body;
          }
        },
        error => {

        }
      );
  }

}
