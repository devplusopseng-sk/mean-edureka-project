import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/sharedService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, public sharedService: SharedService) { }

  ngOnInit(): void {
  }

  logout(): void {
    console.log('Inside logout');
    sessionStorage.removeItem('currentUser');
    this.sharedService.clear();
    this.router.navigateByUrl('/login');
  }

}
