import { AfterViewInit, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './services/sharedService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-edureka-prj';
  constructor(public router: Router, public sharedService: SharedService, private cdref: ChangeDetectorRef) {
    this.router = router;
  }
  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event): void {
    if (sessionStorage.getItem('currentUser')) {
      {
        sessionStorage.setItem('temp', (window.btoa(unescape(encodeURIComponent(JSON.stringify(this.sharedService))))));
      }
      event.returnValue = false;
    }
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
