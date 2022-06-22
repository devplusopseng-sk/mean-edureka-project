import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { ErrorServiceService } from 'src/app/util/error/error-service.service';
import { Router } from '@angular/router';
import { ApiCallsService } from 'src/app/services/api-calls/api-calls.service';
import { SharedService } from 'src/app/services/sharedService';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  updateUser: User = new User();
  password: Password = new Password();

  constructor(
    private errorService: ErrorServiceService,
    private router: Router,
    public sharedService: SharedService,
    private apiCalls: ApiCallsService
  ) { }

  ngOnInit(): void {
    this.updateUser._id = this.sharedService.authDetails._id;
    this.updateUser.firstName = this.sharedService.authDetails.firstName;
    this.updateUser.lastName = this.sharedService.authDetails.lastName;
    this.updateUser.email = this.sharedService.authDetails.email;
    this.updateUser.phone = this.sharedService.authDetails.phone;
    this.updateUser.dob = this.sharedService.authDetails.dob;
    this.updateUser.country = this.sharedService.authDetails.country;
    this.updateUser.state = this.sharedService.authDetails.state;
    this.updateUser.city = this.sharedService.authDetails.city;
    this.updateUser.pincode = this.sharedService.authDetails.pincode;
    this.updateUser.gender = this.sharedService.authDetails.gender;
  }

  updateUserDetails() {
    console.log('Inside updateUserDetails');
    this.apiCalls.update(this.updateUser).subscribe(
      res => {
        const resp = JSON.parse(JSON.stringify(res));
        if (resp.status === 200) {
          this.sharedService.authDetails._id = this.updateUser._id;
          this.sharedService.authDetails.firstName = this.updateUser.firstName;
          this.sharedService.authDetails.lastName = this.updateUser.lastName;
          this.sharedService.authDetails.email = this.updateUser.email;
          this.sharedService.authDetails.phone = this.updateUser.phone;
          this.sharedService.authDetails.dob = this.updateUser.dob;
          this.sharedService.authDetails.country = this.updateUser.country;
          this.sharedService.authDetails.state = this.updateUser.state;
          this.sharedService.authDetails.city = this.updateUser.city;
          this.sharedService.authDetails.pincode = this.updateUser.pincode;
          this.sharedService.authDetails.gender = this.updateUser.gender;
          window.scrollTo(0, 0);
          this.errorService.addError({
            msg: 'Successfully updated the user details.',
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
