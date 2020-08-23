import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataProvider {
  public data: { password: string } = {
    password: '',
  };
  constructor() {}

  public setData(passwordparam: string) {
    this.data = { password: passwordparam };
  }
}
