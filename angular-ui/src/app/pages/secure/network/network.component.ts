import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls/api-calls.service';
import { SharedService } from 'src/app/services/sharedService';
import { ErrorServiceService } from 'src/app/util/error/error-service.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

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
          this.friends.usrObj = this.friends.usrObj.filter((f: any) => f.status !== 'You are friend');
          console.log(this.friends.usrObj);
        }
      },
      error => {

      }
    );
  }

  createRequest(friendId: any) {
    console.log('Inside getFriends');
    let request = {
      userId: this.sharedService.authDetails._id,
      friendId: friendId,
      status: 'Request Pending'
    }
    this.apiCalls.createrequest(request).subscribe(
      res => {
        console.log(res);
        const resp = JSON.parse(JSON.stringify(res));
        if (resp.status === 200) {
          this.getFriends();
        }
      },
      error => {

      }
    );
  }

  updateRequest(reqId: any) {
    console.log('Inside updateRequest');
    let request = {
      status: 'You are friend'
    }
    this.apiCalls.updaterequest(request, reqId).subscribe(
      res => {
        console.log(res);
        const resp = JSON.parse(JSON.stringify(res));
        if (resp.status === 200) {
          this.getFriends();
        }
      },
      error => {

      }
    );
  }



}
