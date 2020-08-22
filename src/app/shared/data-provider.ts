import { Injectable } from '@angular/core';

@Injectable()
export class DataProvider {
  data: any = {
    password: '',
  };
  constructor(){};
}
