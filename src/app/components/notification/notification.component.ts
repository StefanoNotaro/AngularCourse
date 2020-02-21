import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() title: string;
  @Input() icon;
  @Input() showConfirmButton: boolean;
  @Input() showCancelButton = false;
  @Input() action: any;
  @Input() id: number;
  @Output() test = new EventEmitter<number>();
  // @Output() response = new EventEmitter<boolean>();

  constructor() {
    this.showConfirmButton = true;
  }

  ngOnInit() {
    Swal.fire({
      icon: this.icon,
      title: this.title,
      showConfirmButton: this.showConfirmButton,
      showCancelButton: this.showCancelButton
    }).then((result: any) => {
      if (result.value) {
        // if (this.action) {
        //   this.action(true);
        // }
        // this.response.emit(true);

        this.test.emit(this.id);
      } else {
        // if (this.action) {
        //   this.action(false);
        // }
        // this.response.emit(false);
        this.test.emit(-1);
      }
    });
  }

}
