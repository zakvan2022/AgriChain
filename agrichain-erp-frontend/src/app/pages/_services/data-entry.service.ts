import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataEntryService {
  private userURL =  '../../../assets/json/data-entry.json';
  constructor( private http: HttpClient ) { }
  getDataEntryForms() {
    const uri = this.userURL;
    return this.http.get(uri).pipe(map (res => {
        return res;
    }, error => {
        return error;
    }));
  }
}
