import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { ApiCallsService } from 'src/app/services/api-calls/api-calls.service';
import { SharedService } from 'src/app/services/sharedService';
import { ErrorServiceService } from 'src/app/util/error/error-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  chngPwdUser: User = new User();
  success = false;
  password: Password = new Password();

  constructor(
    private errorService: ErrorServiceService,
    private router: Router,
    public sharedService: SharedService,
    private apiCalls: ApiCallsService
  ) { }

  ngOnInit(): void {
  }

  authCheck() {
    console.log('Inside authCheck');
    let request = {
      email: this.chngPwdUser.email,
      dob: this.chngPwdUser.dob,
    }
    this.apiCalls.authCheck(request).subscribe(
      res => {
        const resp = JSON.parse(JSON.stringify(res));
        if (resp.status === 200) {
          this.success = true;
          this.sharedService.token = resp.body.token;
          window.scrollTo(0, 0);
          this.errorService.addError({
            msg: 'Successfully validated the user.',
            type: 'success', closable: true
          });
        }
      },
      error => {
      },
    );
  }

  changePassword() {
    console.log('Inside changePassword');
    let request = {
      password: this.password.newPassword
    }
    this.apiCalls.changePassword(request).subscribe(
      res => {
        const resp = JSON.parse(JSON.stringify(res));
        if (resp.status === 200) {
          window.scrollTo(0, 0);
          this.errorService.addError({
            msg: 'Successfully changed the user password.',
            type: 'success', closable: true
          });
        }
      },
      error => {
      },
    );
  }

}

class Password {
  newPassword!: string;
  confirmPassword!: string;
}
