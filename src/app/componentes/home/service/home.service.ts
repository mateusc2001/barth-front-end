import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  public getUsuarioLogado(): number {
    const user: any = window.localStorage.getItem('ls.user') || {};
    return JSON.parse(user).id;
  }
}
