import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/services/api-calls/api-calls.service';
import { SharedService } from 'src/app/services/sharedService';
import { ErrorServiceService } from 'src/app/util/error/error-service.service';

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.css']
})
export class ProfileSectionComponent implements OnInit {

  posts: any;
  friends: any;

  constructor(
    public sharedService: SharedService,
    private errorService: ErrorServiceService,
    private apiCalls: ApiCallsService,
  ) { }

  ngOnInit(): void {
    this.getPostsByUserId();
    this.getFriends();
  }

  getPostsByUserId() {
    console.log('Inside getMasters');
      this.apiCalls.getPostByUserId(this.sharedService.authDetails._id).subscribe(
        res => {
          console.log(res);
          const resp = JSON.parse(JSON.stringify(res));
          if (resp.status === 200) {
            this.posts = resp.body.length;
          }
        },
        error => {

        }
      );
  }

  getFriends() {
    console.log('Inside getFriends');
    this.apiCalls.getFriends().subscribe(
      res => {
        console.log(res);
        const resp = JSON.parse(JSON.stringify(res));
        if (resp.status === 200) {
          resp.body.usrObj = resp.body.usrObj.filter((f: any) => f._id !== this.sharedService.authDetails._id);
          this.friends = resp.body.usrObj.filter((f: any) => f.status === 'You are friend').length;
          
        }
      },
      error => {

      }
    );
  }

}
