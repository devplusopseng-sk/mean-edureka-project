import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { ApiCallsService } from 'src/app/services/api-calls/api-calls.service';
import { SharedService } from 'src/app/services/sharedService';
import { ErrorServiceService } from 'src/app/util/error/error-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  constructor(
    public sharedService: SharedService,
    private errorService: ErrorServiceService,
    private apiCalls: ApiCallsService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    console.log('Inside getUser');
      this.apiCalls.getUsers().subscribe(
        res => {
          console.log(res);
          const resp = JSON.parse(JSON.stringify(res));
          if (resp.status === 200) {
            this.users = resp.body;
            this.users = this.users.filter((f: any) => f._id !== this.sharedService.authDetails._id);
          }
        },
        error => {

        }
      );
  }

}
