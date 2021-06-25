import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask: boolean;
  private subject: Subject<any>;

  constructor() {
    this.showAddTask = false;
    this.subject = new Subject<any>();
  }

  toogleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  onToogle(): Observable<any> {
    return this.subject.asObservable();
  }
}
