import { Injectable } from '@angular/core';

import { find, compact } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export default class Helper {
  constructor() { }

  public filterObject(obj: Array<object>, key: Array<string>, val: string | number): Array<object> {
    return compact(key.map(item => find(obj, [item, val])));
  }

}