import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-dev',
  templateUrl: './info-dev.component.html',
  styleUrls: ['./info-dev.component.css']
})
export class InfoDevComponent implements OnInit {

  public enviroment: any;
  constructor() { }

  ngOnInit(): void {
    this.enviroment = environment;
  }

  public keys() {
    return Object.keys(this.enviroment);
  }

  public value(key: any) {
    return this.enviroment[key];
  }

}
