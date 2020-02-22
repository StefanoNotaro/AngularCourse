import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { NotificationBO } from '../models/notificationBO.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() configurations: NotificationBO;

  @Output() outPut = new EventEmitter<NotificationBO>();

  constructor() {
  }

  ngOnInit() {
    Swal.fire({
      icon: this.configurations.icon as any,
      title: this.configurations.title,
      showConfirmButton: this.configurations.showConfirmButton,
      showCancelButton: this.configurations.showCancelButton
    }).then((result: any) => {
      if (result.value) {
        this.configurations.confirmation = true;
        this.outPut.emit(this.configurations);
      } else {
        this.configurations.confirmation = false;
        this.outPut.emit(this.configurations);
      }
    });
  }

}
