import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-ngbd-alert-selfclosing',
  templateUrl: './ngbd-alert-selfclosing.component.html',
  styleUrls: ['./ngbd-alert-selfclosing.component.css']
})
export class NgbdAlertSelfclosingComponent implements OnInit {

  private _success = new Subject<string>();

  @Input() messageReceived: string;

  staticAlertClosed = false;
  successMessage: string;

  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    this._success.next(`${ this.messageReceived }`);
  }

}
