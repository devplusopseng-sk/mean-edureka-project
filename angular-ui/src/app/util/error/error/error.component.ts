import { Component, OnDestroy } from '@angular/core';
import { ErrorServiceService } from '../error-service.service';
import { Router } from '@angular/router';
import { Alert } from '../../../model/Alert';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnDestroy {
  public alerts: Alert[] = [];
  subscription: any;

  constructor(private errorService: ErrorServiceService, public router: Router) {
    this.subscription = this.errorService.getMessage().subscribe(message => {
      console.log('worked: ' + message);
    });
    this.errorService.errorService$.subscribe(
      obj => {
        console.log('Inside errorService error component');
        console.log(obj);

        if (obj === -1) {
          this.alerts = [];
        } else {
          this.alerts.push(obj as Alert);
        }
      }
    );
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  public closeAlert(i: number): void {
    this.alerts.splice(i, 1);
  }

  public addError(): void {
    console.log('Inside addError error component');
    this.alerts.push({ msg: 'Another alert!', type: 'warning', closable: true });
  }

}
