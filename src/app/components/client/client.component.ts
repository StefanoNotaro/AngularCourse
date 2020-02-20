import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DataBaseService } from '../../services/data-base.service';
import { Cliente } from '../models/cliente.model';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client: Cliente;

  constructor(public _activatedRoute: ActivatedRoute, private _databaseService: DataBaseService) {
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(x => {
      this._databaseService.getClientById(x.get('id')).subscribe(x => {
        this.client = x;
      }, err => {
        console.log('Oops:', err);
      });
    });
  }

}
