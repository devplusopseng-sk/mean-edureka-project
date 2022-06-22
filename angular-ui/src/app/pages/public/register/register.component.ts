import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { ErrorServiceService } from 'src/app/util/error/error-service.service';
import { Router } from '@angular/router';
import { ApiCallsService } from 'src/app/services/api-calls/api-calls.service';
import { SharedService } from 'src/app/services/sharedService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: User = new User();

  constructor(
    private errorService: ErrorServiceService,
    private router: Router,
    public sharedService: SharedService,
    private apiCalls: ApiCallsService
  ) { }

  ngOnInit(): void {

  }

  submitRegisteration() {
    console.log('Inside submitRegisteration');
    this.apiCalls.register(this.registerUser).subscribe(
      res => {
        const resp = JSON.parse(JSON.stringify(res));
        if (resp.status === 200) {
          window.scrollTo(0, 0);
          this.errorService.addError({
            msg: 'Successfully registered the user.',
            type: 'success', closable: true
          });
          this.router.navigateByUrl('/login');
        }
      },
      error => {
      },
    );
  }

}
