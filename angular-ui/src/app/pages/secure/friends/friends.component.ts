import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls/api-calls.service';
import { SharedService } from 'src/app/services/sharedService';
import { ErrorServiceService } from 'src/app/util/error/error-service.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends: any;

  constructor(
    public sharedService: SharedService,
    private errorService: ErrorServiceService,
    private apiCalls: ApiCallsService,
  ) { }

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends() {
    console.log('Inside getFriends');
      this.apiCalls.getFriends().subscribe(
        res => {
          console.log(res);
          const resp = JSON.parse(JSON.stringify(res));
          if (resp.status === 200) {
            this.friends = resp.body;
            this.friends.usrObj = this.friends.usrObj.filter((f: any) => f._id !== this.sharedService.authDetails._id);
            this.friends.usrObj = this.friends.usrObj.filter((f: any) => f.status === 'You are friend');
          }
        },
        error => {

        }
      );
  }

}
