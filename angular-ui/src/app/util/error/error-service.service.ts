import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorServiceService {

  private subject = new Subject<any>();
  private errorServiceSource = new Subject<Object>();
  errorService$ = this.errorServiceSource.asObservable();

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  addError(obj: Object): void {
    console.log('Inside addError of error-service');
    this.errorServiceSource.next(obj);
  }

  constructor() {
    this.sendMessage('test');
  }
}
