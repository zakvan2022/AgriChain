import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root',
})
export class LogisticsRecordService {

  constructor(private http: Http) { }
  private userURL = '../../../assets/json/logistics-record.json';

  getLogisticsRecords(): Observable<any> {
    return this.http.get(this.userURL).map((res: Response) => res.json());
  }

  createLogisticsRecords(BatchRecords: any): Observable<any> {
    // console.log(BatchRecords)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(BatchRecords);

    return this.http.post(this.userURL, body, options).map((res: Response) => {
      // console.log(res)
    });
  }

  editLogisticsRecords(BatchRecords: any): Observable<any> {
    // console.log(BatchRecords)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(BatchRecords);

    return this.http.post(this.userURL, body, options).map((res: Response) => {
      // console.log(res)
    });
  }
}
